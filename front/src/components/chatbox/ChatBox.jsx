import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./chatbox.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

export default function ChatBox({ chat }) {
  const [receiverUser, setReceiverUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = chat?.members?.find((id) => id != currentUser.id);
        const result = await axios.get(`/api/users/${userId}`);
        setReceiverUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getMessages = async () => {
      try {
        const result = await axios.get("/api/messages/" + chat._id);
        setMessages(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat) getUser();
    if (chat) getMessages();
  }, [currentUser.id, chat]);

  const handleSend = () => {};

  return (
    <div className="chatbox">
      {chat ? (
        <>
          <div className="header">
            <div className="image">
              <img src={receiverUser?.profile_pic} alt="Profile Picture" />
              <div className="indicator"></div>
            </div>
            <div className="text">
              <span className="name">{receiverUser?.name}</span>
              <span className="online">Online</span>
            </div>
          </div>
          <div className="seperator"></div>
          <div className="message-box">
            {messages.map((message) => {
              return (
                <div
                  key={message._id}
                  className={
                    Number(message.senderId) === currentUser.id
                      ? "message sender"
                      : "message receiver"
                  }
                >
                  <span>{message.message}</span>
                  <span className="time">
                    {moment(message.createdAt).fromNow()}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="send">
            <input
              type="text"
              placeholder="Send message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSend}>
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </>
      ) : (
        <span className="no-chat">No chat selected</span>
      )}
    </div>
  );
}

ChatBox.propTypes = {
  chat: PropTypes.object,
};
