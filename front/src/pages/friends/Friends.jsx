import { useContext, useEffect, useState } from "react";
import "./friends.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const result = await axios.get("/api/relationships");
        setFriends(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, []);
  return (
    <div className="friends-page">
      {friends.length === 0 ? (
        <span className="no-friends">No friends to show</span>
      ) : (
        friends.map((friend) => {
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
  );
}
