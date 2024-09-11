import "./friends.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Suggestions from "../../components/suggestions/Suggestions";

export default function Friends() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const result = await axios.get("/api/relationships");
        return result.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="friends-page">
      <div className="friendss">
        {isLoading ? (
          <div className="loader"></div>
        ) : data.length === 0 ? (
          <span className="no-friends">You don&apos;t follow anyone</span>
        ) : (
          data.map((friend) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={"/profile/" + friend.id}
                key={friend.id}
              >
                <div>
                  <img src={friend.profile_pic} alt="Profile Pic" />
                  <span>{friend.name}</span>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <Suggestions className="mobile-suggestions" />
    </div>
  );
}
