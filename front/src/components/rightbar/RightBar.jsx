import { useContext, useEffect, useState } from "react";
import "./rightbar.scss";
import { OnlineContext } from "../../context/onlineContext";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function RightBar() {
  const { onlineUsers } = useContext(OnlineContext);
  const [onlineUsersData, setOnlineUsersData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const online = async () => {
      if (onlineUsers.length > 1) {
        const results = [];
        const promises = onlineUsers.map(async (user) => {
          if (user.userId !== currentUser.id) {
            try {
              const result = await axios.get("/api/users/" + user.userId);
              const following = await axios.get(
                "/api/relationships/" + currentUser.id
              );
              if (following.data.includes(result.data.id)) {
                results.push(result.data);
              }
            } catch (err) {
              console.log(err);
            }
          }
        });

        await Promise.all(promises);
        setOnlineUsersData(results);
      } else {
        setOnlineUsersData([]);
      }
    };

    online();
  }, [onlineUsers, currentUser]);

  return (
    <div className="rightbar">
      <div className="online">
        <span className="title">Online</span>
        {onlineUsersData.length === 0 ? (
          <span className="no-online">No online friends</span>
        ) : (
          onlineUsersData.map((user) => (
            <div key={user.id} className="user">
              <div className="user-info">
                <img src={user.profile_pic} alt="User Image" />
                <div className="indicator"></div>
                <span>{user.name}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
