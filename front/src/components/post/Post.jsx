import { Link } from "react-router-dom";
import "./post.scss";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

export default function Post({ post }) {
  const [commentVisibility, setCommentVisibility] = useState(false);
  const {
    isLoading,
    error,
    data: commentsCount,
  } = useQuery({
    queryKey: ["commentsCount", post.id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/comments/${post.id}`);
        return res.data.length;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const {
    isLoading: likesIsLoading,
    error: likesError,
    data: likes,
  } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: async () => {
      const res = await axios.get(`/api/likes/${post.id}`);
      return res.data;
    },
  });

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (condition) => {
      try {
        if (condition) {
          return await axios.delete(`/api/likes/${post.id}`);
        } else {
          return await axios.post("/api/likes", { post_id: post.id });
        }
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const handleLike = () => {
    mutation.mutate(likes.includes(currentUser.id));
  };

  const handleComment = () => {
    setCommentVisibility(!commentVisibility);
  };

  return (
    <div className="post">
      <div className="top">
        <div className="left">
          <img src={post.profile_pic} alt="User Image" />
          <div className="name-time">
            <Link className="name" to={`/profile/${post.user_id}`}>
              <span>{post.name}</span>
            </Link>
            <span>{moment(post.date).fromNow()}</span>
          </div>
        </div>
        <div className="right">
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className="content">
        <span>{post.description}</span>
        {post.img && <img src={post.img} alt="Post Image"></img>}
      </div>
      <div className="reactions">
        <div className="like">
          {likesIsLoading ? (
            <i className="bi bi-heart" onClick={handleLike}></i>
          ) : likes.includes(currentUser.id) ? (
            <i className="bi bi-heart-fill" onClick={handleLike}></i>
          ) : (
            <i className="bi bi-heart" onClick={handleLike}></i>
          )}
          <span>{likesIsLoading ? "" : likes.length} Like</span>
        </div>
        <div className="comment" onClick={handleComment}>
          <i className="bi bi-chat-left-dots"></i>
          <span>{commentsCount} Comment</span>
        </div>
      </div>
      {commentVisibility && <Comments postId={post.id} />}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
