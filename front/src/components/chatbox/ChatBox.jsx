import { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./chatbox.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import moment from "moment";
import { OnlineContext } from "../../context/onlineContext";

export default function ChatBox({ chat, checkOnlineStatus }) {
  const [receiverUser, setReceiverUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { socket } = useContext(OnlineContext);
  const messageBoxRef = useRef(null);
  const messageRef = useRef(null);
  const firstLoad = useRef(true);

  useEffect(() => {
    const messageBox = messageBoxRef.current;

    if (messageBox && messageBox.scrollTop === 0 && firstLoad.current) {
      messageBox.scrollTop = messageBox.scrollHeight;
      setTimeout(() => {
        firstLoad.current = false;
      }, 1000);
    }

    if (
      messageBox &&
      messageRef.current &&
      Math.abs(
        messageBox.scrollTop +
          messageBox.offsetHeight -
          (messageBox.scrollHeight - messageRef.current.offsetHeight - 20)
      ) <= 1
    ) {
      messageBox.scrollTop = messageBox.scrollHeight;
    }

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

    // Receive message from socket server (basically what will the socket do if it receives a "receive message").
    if (socket.current) {
      socket.current.on("receive message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }
  }, [currentUser.id, chat, socket]);

  const handleSend = async () => {
    if (newMessage) {
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
      if (socket.current) {
        socket.current.emit("send message", { ...message, receiverId });
      }
    }
  };

  return (
    <div className="chatbox">
      {chat ? (
        <>
          {receiverUser && (
            <>
              <div className="header">
                <div className="image">
                  <img src={receiverUser?.profile_pic} alt="Profile Picture" />
                  {checkOnlineStatus(chat) && <div className="indicator"></div>}
                </div>
                <div className="text">
                  <span className="name">{receiverUser?.name}</span>
                  <span className="online">
                    {checkOnlineStatus(chat) ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
              <div className="seperator"></div>
            </>
          )}

          <div className="message-box" ref={messageBoxRef}>
            {/* The ref attribute in React is used to create a reference to a DOM element or a class component instance. This reference can then be used to directly interact with the DOM element or component instance, such as accessing its properties or methods*/}
            {messages.map((message) => {
              return (
                <div
                  ref={messageRef}
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
  checkOnlineStatus: PropTypes.func.isRequired,
};
