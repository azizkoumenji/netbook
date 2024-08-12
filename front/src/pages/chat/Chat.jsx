import { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./chat.scss";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import ChatBox from "../../components/chatbox/ChatBox";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

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
  }, []);

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
        <ChatBox chat={currentChat} />
      </div>
    </>
  );
}
