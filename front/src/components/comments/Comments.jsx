import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

export default function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/comments/${postId}`);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profile_pic} alt="" />
        <textarea type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <span className="error">Something went wrong :(</span>
      ) : (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <div className="content">
              <img src={comment.profile_pic} alt="User Image" />
              <div className="name-comment">
                <span className="name">{comment.name}</span>
                <span>{comment.comment}</span>
              </div>
            </div>
            <span className="time">{moment(comment.date).fromNow()}</span>
          </div>
        ))
      )}
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.number.isRequired,
};
