import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./chatbox.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

export default function ChatBox({ chat, setSendMessage, receivedMessage }) {
  const [receiverUser, setReceiverUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef(null);

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

    if (chat) getUser();

    const getMessages = async () => {
      try {
        const result = await axios.get("/api/messages/" + chat._id);
        setMessages(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat) getMessages();

    if (receivedMessage) {
      setMessages([...messages, receivedMessage]);
    }

    // Scroll to bottom after receiving or sending message.
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [currentUser.id, chat, messages, receivedMessage]);

  const handleSend = async () => {
    // Send message to databse.
    const message = {
      message: newMessage,
      chatId: chat._id,
    };

    try {
      const result = await axios.post("/api/messages", message);
      setMessages([...messages, result.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }

    // Send message to socket server.
    const receiverId = chat.members.find((id) => id != currentUser.id);
    setSendMessage({ ...message, receiverId });
  };

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
                  ref={scroll}
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
