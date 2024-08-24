import axios from "axios";
import "./newchat.scss";
import { useContext, useEffect, useState } from "react";
import { OnlineContext } from "../../context/onlineContext";

export default function NewChat({ setShowNewChat, setChats }) {
  const [following, setFollowing] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { socket } = useContext(OnlineContext);
  const [resetSearch, setResetSeach] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const result = await axios.get("/api/relationships");
        setFollowing(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFollowing();
  }, [resetSearch]);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value) {
      const filteredList = following.filter((user) =>
        user.name.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setFollowing(filteredList);
    } else {
      setResetSeach(!resetSearch);
    }
  };

  const handleClick = async (user) => {
    // Add chat to database.
    try {
      const result = await axios.post("/api/chat", { receiverId: user.id });
      setChats((prev) => [...prev, result.data]);
      // Send chat to socket server.
      if (socket.current) {
        socket.current.emit("send chat", {
          ...result.data,
          receiverId: user.id,
        });
      }

      setSearchKey("");
    } catch (err) {
      console.log(err);
    }
    setShowNewChat(false);
  };

  return (
    <div className="background" onClick={() => setShowNewChat(false)}>
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <div className="search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            value={searchKey}
          />
        </div>
        <div className="following-list">
          {following.length === 0 ? (
            <span className="no-contacts">No contacts</span>
          ) : (
            following.map((user) => (
              <div
                key={user.id}
                className="contact"
                onClick={() => handleClick(user)}
              >
                <img src={user.profile_pic} alt="Profile Pic" />
                <span className="name">{user.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}