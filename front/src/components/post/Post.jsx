import { Link } from "react-router-dom";
import "./post.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import Comments from "../comments/Comments";

export default function Post({ post }) {
  const [liked, setLiked] = useState(false);
  const [commentVisibility, setCommentVisibility] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setCommentVisibility(!commentVisibility);
  };

  return (
    <div className="post">
      <div className="top">
        <div className="left">
          <img src={post.profilePic} alt="User Image" />
          <div className="name-time">
            <Link className="name" to={`/profile/${post.userId}`}>
              <span>{post.username}</span>
            </Link>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="right">
          <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <div className="content">
        <span>{post.desc}</span>
        {post.img && <img src={post.img} alt="Post Image"></img>}
      </div>
      <div className="reactions">
        <div className="like">
          {liked ? (
            <i className="bi bi-heart-fill" onClick={handleLike}></i>
          ) : (
            <i className="bi bi-heart" onClick={handleLike}></i>
          )}
          <span>{post.likes} Like</span>
        </div>
        <div className="comment" onClick={handleComment}>
          <i className="bi bi-chat-left-dots"></i>
          <span>{post.commentCount} Comment</span>
        </div>
      </div>
      {commentVisibility && <Comments />}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
