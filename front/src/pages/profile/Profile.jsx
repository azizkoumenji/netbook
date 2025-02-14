import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./profile.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { lazy, Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import Update from "../../components/update/Update";

const Post = lazy(() => import("../../components/post/Post"));

export default function Profile() {
  const userId = useLocation().pathname.split("/")[2]; // useLocation().pathname returns our link.

  const [update, setUpdate] = useState(false);

  const { isLoading, data } = useQuery({
    queryKey: ["user", userId, update], // Include userId in queryKey so everytime userId changes the queryFn is run again.
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { data: followersData } = useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      try {
        const result = await axios.get(
          "/api/relationships/followers/" + userId
        );
        return result.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { isLoading: postsAreLoading, data: posts } = useQuery({
    queryKey: ["userPosts", userId, update],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/posts/user/${userId}`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { isLoading: relationshipsAreLoading, data: relationshipData } =
    useQuery({
      queryKey: ["relationships"],
      queryFn: async () => {
        try {
          const res = await axios.get(`/api/relationships/${currentUser.id}`);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      },
    });

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (following) => {
      try {
        if (following)
          return await axios.delete(`/api/relationships/${userId}`);
        return await axios.post("/api/relationships/", { userId });
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", userId, update]);
    },
  });

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(Number(userId)));
  };

  const [showUpdate, setShowUpdate] = useState(false);

  return (
    <>
      {showUpdate && (
        <Update
          setShowUpdate={setShowUpdate}
          setUpdate={setUpdate}
          update={update}
          userId={userId}
        />
      )}
      {isLoading || postsAreLoading ? (
        <div className="profile">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="profile">
          <div className="images">
            <img src={data.cover_pic} alt="Cover" />
            <img src={data.profile_pic} alt="Profile Picture" />
          </div>
          <div className="profile-container">
            <div className="left">
              <i className="bi bi-cake2-fill"></i>
              <span>{moment(data.birthday).format("MMMM DD, YYYY")}</span>
            </div>
            <div className="center">
              <span className="name">{data.name}</span>
              {currentUser.id === data.id ? (
                <button onClick={() => setShowUpdate(true)}>Update</button>
              ) : (
                <button onClick={handleFollow}>
                  {relationshipsAreLoading
                    ? ""
                    : relationshipData.includes(Number(userId))
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
            <div className="right">
              <i className="bi bi-people-fill"></i>
              <span className="followers">
                {followersData && followersData.length} Followers
              </span>
            </div>
          </div>
          <div className="posts">
            {postsAreLoading ? (
              ""
            ) : posts.length === 0 ? (
              <span className="no-posts">No posts</span>
            ) : (
              posts.map((post) => (
                <Suspense key={post.id}>
                  <Post post={post} />
                </Suspense>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
