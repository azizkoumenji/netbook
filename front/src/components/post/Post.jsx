import { Link } from "react-router-dom";
import "./post.scss";
import PropTypes from "prop-types";
import { useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";

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
          {liked ? (
            <i className="bi bi-heart-fill" onClick={handleLike}></i>
          ) : (
            <i className="bi bi-heart" onClick={handleLike}></i>
          )}
          <span>{post.likes} Like</span>
        </div>
        <div className="comment" onClick={handleComment}>
          <i className="bi bi-chat-left-dots"></i>
          <span>{post.comment_count} Comment</span>
        </div>
      </div>
      {commentVisibility && <Comments postId={post.id} />}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
