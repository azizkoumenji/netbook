import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./suggestions.scss";
import axios from "axios";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

export default function Suggestions({ className }) {
  const { isLoading, data } = useQuery({
    queryKey: ["suggestions"],
    queryFn: async () => {
      try {
        const result = await axios.get("/api/users/get/suggestions");
        return result.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userId) => {
      try {
        return await axios.post("/api/relationships", { userId });
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationships"]);
    },
  });

  const handleFollow = (userId) => {
    mutation.mutate(userId);
  };

  return (
    <div className={"suggestions-card " + className}>
      <span className="title">Suggestions</span>
      {isLoading ? (
        <div className="loader"></div>
      ) : data.length === 0 ? (
        <span className="empty-response">No suggestions</span>
      ) : (
        data.map((user) => (
          <div key={user.id} className="user">
            <Link to={"/profile/" + user.id} className="link">
              <div className="user-info">
                <img
                  src={user.profile_pic}
                  className="image"
                  alt="User Image"
                />
                <span>{user.name}</span>
              </div>
            </Link>
            <button className="follow" onClick={() => handleFollow(user.id)}>
              Follow
            </button>
          </div>
        ))
      )}
    </div>
  );
}

Suggestions.propTypes = {
  className: PropTypes.string,
};
