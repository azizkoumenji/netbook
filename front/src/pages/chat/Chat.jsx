import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";
import "./chat.scss";
import axios from "axios";
import Conversation from "../../components/conversation/Conversation";
import ChatBox from "../../components/chatbox/ChatBox";
import { AuthContext } from "../../context/authContext";
import { OnlineContext } from "../../context/onlineContext";
import NewChat from "../../components/newchat/NewChat";

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { onlineUsers } = useContext(OnlineContext);
  const [showNewChat, setShowNewChat] = useState(false);
  const { socket } = useContext(OnlineContext);
  const [showChatBox, setShowChatBox] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getChats = async () => {
      try {
        const result = await axios.get("/api/chat");
        setChats(result.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
    if (socket.current) {
      socket.current.on("receive chat", (chat) => {
        setChats((prev) => [...prev, chat]);
      });
    }
  }, [socket]);

  const checkOnlineStatus = (chat) => {
    const receiverId = chat.members.find((id) => id != currentUser.id);
    const online = onlineUsers.find((user) => user.userId === receiverId);
    return online ? true : false;
  };

  return (
    <>
      {showNewChat && (
        <NewChat
          setShowNewChat={setShowNewChat}
          setChats={setChats}
          setCurrentChat={setCurrentChat}
          chats={chats}
        />
      )}
      <NavBar />
      <div className="chat-desktop">
        <div className="chat-list">
          <div className="header">
            <span className="title">Chats</span>
            <i
              className="bi bi-plus-circle"
              onClick={() => setShowNewChat(true)}
            ></i>
          </div>
          <div className="list">
            {loader ? (
              <div className="loader"></div>
            ) : chats.length === 0 ? (
              <span className="no-chats">No chats</span>
            ) : (
              chats.map((chat) => {
                return (
                  <Conversation
                    checkOnlineStatus={checkOnlineStatus}
                    onClick={() => setCurrentChat(chat)}
                    key={chat._id}
                    data={chat}
                  />
                );
              })
            )}
          </div>
        </div>
        <ChatBox checkOnlineStatus={checkOnlineStatus} chat={currentChat} />
      </div>
      <div className="chat-mobile">
        {showChatList && (
          <div className="chat-list">
            <div className="header">
              <span className="title">Chats</span>
              <i
                className="bi bi-plus-circle"
                onClick={() => setShowNewChat(true)}
              ></i>
            </div>
            <div className="list">
              {chats.length === 0 ? (
                <span className="no-chats">No chats</span>
              ) : (
                chats.map((chat) => {
                  return (
                    <Conversation
                      checkOnlineStatus={checkOnlineStatus}
                      onClick={() => {
                        setCurrentChat(chat);
                        setShowChatBox(true);
                        setShowChatList(false);
                      }}
                      key={chat._id}
                      data={chat}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}
        {showChatBox && (
          <ChatBox
            setShowChatBox={setShowChatBox}
            setShowChatList={setShowChatList}
            checkOnlineStatus={checkOnlineStatus}
            chat={currentChat}
          />
        )}
      </div>
    </>
  );
}
