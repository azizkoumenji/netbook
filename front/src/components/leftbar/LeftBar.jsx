import "./leftbar.scss";
import X from "./logos/x-logo.png";
import YouTube from "./logos/youtube-logo.png";
import Reddit from "./logos/reddit-logo.png";
import LinkedIn from "./logos/linkedin-logo.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function LeftBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftbar">
      <div className="user">
        <Link to={`/profile/${currentUser.id}`} className="profile">
          <img src={currentUser.profile_pic} alt="User Image" />
          <span>{currentUser.name}</span>
        </Link>
      </div>
      <Link
        to="/following"
        style={{ textDecoration: "none", color: "var(--text-dark)" }}
      >
        <div className="friends">
          <i className="bi bi-people-fill"></i>
          <span>Following</span>
        </div>
      </Link>
      <Link
        to="/chat"
        style={{ textDecoration: "none", color: "var(--text-dark)" }}
      >
        <div className="messages">
          <i className="bi bi-chat-fill"></i>
          <span>Messages</span>
        </div>
      </Link>
      <span className="shortcuts">Shortcuts</span>
      <div className="youtube">
        <img src={YouTube} alt="Youtube" />
        <a href="https://youtube.com" target="blank">
          YouTube
        </a>
      </div>
      <div className="linkedin">
        <img src={LinkedIn} alt="LinkedIn" />
        <a href="https://linkedin.com" target="blank">
          LinkedIn
        </a>
      </div>
      <div className="reddit">
        <img src={Reddit} alt="Reddit" />
        <a href="https://reddit.com" target="blank">
          Reddit
        </a>
      </div>
      <div className="x">
        <img src={X} alt="X" />
        <a href="https://x.com" target="blank">
          X
        </a>
      </div>
    </div>
  );
}
