import { useContext, useEffect, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function NavBar() {
  const { theme, toggleTheme } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [showNoResult, setShowNoResult] = useState(false);

  const handleSearch = async (e) => {
    setSearchKey(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      setShowNoResult(false);
      setTimeout(() => {
        setSearchResults([]);
        setShowNoResult(false);
      }, 1000); // Used a timeout to fix a state glitch when I long press delete button.
      setTimeout(() => {
        setSearchResults([]);
        setShowNoResult(false);
      }, 3000);
    } else {
      try {
        const res = await axios.post("/api/users/", {
          searchKey: e.target.value,
        });

        if (res.data.length === 0) {
          setShowNoResult(true);
        } else {
          setShowNoResult(false);
        }
        setSearchResults(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        <Link to="/">
          <i className="bi bi-house-fill"></i>
        </Link>
        <i className="bi bi-chat-fill"></i>
      </div>
      <div className="search">
        <i className="bi bi-search"></i>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
          value={searchKey}
        />
        {showNoResult ? (
          <div className="search-results">
            <span className="no-result">No result</span>
          </div>
        ) : (
          searchResults.length != 0 && (
            <div className="search-results">
              {searchResults.map((user) => (
                <Link
                  style={{ textDecoration: "none", color: "var(--text-dark)" }}
                  key={user.id}
                  to={`/profile/${user.id}`}
                  onClick={() => {
                    setSearchKey("");
                    setSearchResults([]);
                  }}
                >
                  <div className="result">
                    <img src={user.profile_pic} alt="Profile Picture" />
                    <span>{user.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}
      </div>
      <div className="right">
        <Link to={`/profile/${currentUser.id}`} className="profile">
          <img src={currentUser.profile_pic} alt="User Image" />
          <span>{currentUser.name}</span>
        </Link>
        <button onClick={logout}>
          <i className="bi bi-door-open-fill"></i> Logout
        </button>
      </div>
    </div>
  );
}
