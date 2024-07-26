import { useContext } from "react";
import Post from "../../components/post/Post";
import "./home.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/api/posts");
      return res.data;
    },
  });

  return (
    <div className="home">
      <div className="write-post">
        <div className="top">
          <img src={currentUser.profile_pic} alt="User Image" />
          <textarea placeholder="What's happening?"></textarea>
        </div>
        <div className="bottom">
          <div className="image">
            <i className="bi bi-image"></i>
            <span>Add image</span>
          </div>
          <button>Share</button>
        </div>
      </div>
      <div className="posts">
        {error ? (
          <span className="message">An error has occured</span>
        ) : isLoading ? (
          <div className="loader"></div>
        ) : (
          data.map((post) => <Post post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
}
