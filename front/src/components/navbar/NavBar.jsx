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
  const [showSearch, setShowSearch] = useState(false);

  console.log(searchKey);
  console.log(searchResults);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const search = async () => {
      if (!searchKey) {
        setSearchResults([]);
        setShowNoResult(false);
      } else {
        try {
          const res = await axios.post(
            "/api/users/",
            {
              searchKey: searchKey,
            },
            { cancelToken: source.token }
          );

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

    search();

    return () => {
      source.cancel("Request canceled by user");
    };
  }, [searchKey]);

  const handleSearch = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    <>
      <div className="navbar">
        <div className="left">
          <Link to="/" className="logo">
            <h1>Netbook</h1>
          </Link>
          <Link to="/">
            <i className="bi bi-house-fill"></i>
          </Link>
          {theme === "dark" ? (
            <i className="bi bi-sun-fill" onClick={toggleTheme}></i>
          ) : (
            <i className="bi bi-moon-fill" onClick={toggleTheme}></i>
          )}

          <Link to="/chat" className="link">
            <i className="bi bi-chat-fill"></i>
          </Link>
          <Link to="/following" className="link">
            <div className="friends">
              <i className="bi bi-people-fill"></i>
            </div>
          </Link>
          <i
            className="bi bi-search search-mobile-icon"
            onClick={() => {
              setShowSearch(!showSearch);
              setSearchKey("");
              setSearchResults([]);
              if (document.body.classList.contains("no-scroll")) {
                document.body.classList.remove("no-scroll");
              } else {
                document.body.classList.add("no-scroll");
              }
            }}
          ></i>
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
                    style={{
                      textDecoration: "none",
                      color: "var(--text-dark)",
                    }}
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
      {showSearch && (
        <div
          className="search-backdrop"
          onClick={() => {
            setShowSearch(!showSearch);
            setSearchKey("");
            setSearchResults([]);
            document.body.classList.remove("no-scroll");
          }}
        >
          <div className="search-mobile" onClick={(e) => e.stopPropagation()}>
            <div className="search-bar">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                value={searchKey}
              />
            </div>
            {showNoResult ? (
              <div className="search-results">
                <span className="no-result">No result</span>
              </div>
            ) : (
              searchResults.length != 0 && (
                <div className="search-results">
                  {searchResults.map((user) => (
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "var(--text-dark)",
                      }}
                      key={user.id}
                      to={`/profile/${user.id}`}
                      onClick={() => {
                        setSearchKey("");
                        setSearchResults([]);
                        setShowSearch(!showSearch);
                        document.body.classList.remove("no-scroll");
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
        </div>
      )}
    </>
  );
}
