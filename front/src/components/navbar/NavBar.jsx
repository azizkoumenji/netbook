import { useContext } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

export default function NavBar() {
  const { theme, toggleTheme } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="logo">
          <h1>Netbook</h1>
        </Link>
        {theme === "dark" ? (
          <i className="bi bi-sun-fill" onClick={toggleTheme}></i>
        ) : (
          <i className="bi bi-moon-fill" onClick={toggleTheme}></i>
        )}
        <i className="bi bi-house-fill"></i>
        <i className="bi bi-chat-fill"></i>
      </div>
      <div className="search">
        <i className="bi bi-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="right">
        <img src={currentUser.profile_pic} alt="User Image" />
        <span>{currentUser.name}</span>
        <button>Logout</button>
      </div>
    </div>
  );
}
