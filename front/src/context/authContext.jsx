import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = () => {
    setCurrentUser({
      id: 1,
      name: "User",
      img: "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
