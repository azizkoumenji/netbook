import { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./chat.scss";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import ChatBox from "../../components/chatbox/ChatBox";
import { io } from "socket.io-client";
import { AuthContext } from "../../context/authContext";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const { currentUser } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const result = await axios.get("/api/chat");
        setChats(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    getChats();

    socket.current = io(import.meta.env.VITE_SOCKET_LINK);
    socket.current.emit("add new user", currentUser.id);
    socket.current.on("get users", (activeUsers) => {
      setOnlineUsers(activeUsers);
    });

    // Send message to socket server.
    if (sendMessage !== null) {
      socket.current.emit("send message", sendMessage);
    }

    // Receive message from socket server.
    socket.current.on("receive message", (message) => {
      setReceivedMessage(message);
    });
  }, [currentUser, sendMessage]);

  return (
    <>
      <NavBar />
      <div className="chat-desktop">
        <div className="chat-list">
          <span className="title">Chats</span>
          {chats.map((chat) => {
            return (
              <Conversation
                onClick={() => setCurrentChat(chat)}
                key={chat._id}
                data={chat}
              />
            );
          })}
        </div>
        <ChatBox
          chat={currentChat}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </>
  );
}
