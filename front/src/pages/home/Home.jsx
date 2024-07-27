import { useContext, useState } from "react";
import Post from "../../components/post/Post";
import "./home.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState("");

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/api/posts");
      return res.data;
    },
  });

  const queryClient = useQueryClient(); // It gives me access the queries in the children the QueryClientProvider kinda like Context API.

  const mutation = useMutation({
    mutationFn: async (post) => {
      return await axios.post("/api/posts/", post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  }); // This reruns the ["posts"] query when I add a new post so we can refresh our home posts.

  const handleSubmit = async () => {
    if (description || img) {
      if (img) {
        const formData = new FormData();
        formData.append("img", img);
        const imgName = await axios.post("/api/uploads/", formData);
        const imgLink = "/api/uploads/" + imgName.data;
        const post = { img: imgLink, description };
        mutation.mutate(post); // Run the mutation.
      } else {
        const post = { img: null, description };
        mutation.mutate(post); // Run the mutation.
      }
      setDescription("");
      setImg(null);
    }
  };

  return (
    <div className="home">
      <div className="write-post">
        <div className="top">
          <div className="left">
            <img src={currentUser.profile_pic} alt="User Image" />
            <textarea
              placeholder="What's happening?"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="right">
            {img && <img src={URL.createObjectURL(img)} alt="Upload Image" />}
          </div>
        </div>
        <div className="bottom">
          <div className="image">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
            <label htmlFor="file" className="image">
              <i className="bi bi-image"></i>
              <span>Add image</span>
            </label>
          </div>
          <button onClick={handleSubmit}>Share</button>
        </div>
      </div>
      <div className="posts">
        {error ? (
          <span className="message">Something went wrong :(</span>
        ) : isLoading ? (
          <div className="loader"></div>
        ) : (
          data.map((post) => <Post post={post} key={post.id} />)
        )}
      </div>
    </div>
  );
}
