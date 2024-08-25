import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const updateCurrUser = () => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  };

  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }

    setCurrentUser(null);
    localStorage.setItem("theme", null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, updateCurrUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
