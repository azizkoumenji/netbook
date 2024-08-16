import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import "./conversation.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function Conversation({ data, onClick, checkOnlineStatus }) {
  const [receiverUser, setReceiverUser] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getUser = async () => {
      const userId = data.members.find((id) => id != currentUser.id);
      const result = await axios.get(`/api/users/${userId}`);
      setReceiverUser(result.data);
    };
    getUser();
  }, [currentUser.id, data]);

  return (
    <>
      {receiverUser && (
        <div className="conversation" onClick={onClick}>
          <div className="image">
            <img src={receiverUser.profile_pic} alt="Profile Picture" />
            {checkOnlineStatus(data) && <div className="indicator"></div>}
          </div>
          <div className="text">
            <span className="name">{receiverUser.name}</span>
            <span className="online">
              {checkOnlineStatus(data) ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

Conversation.propTypes = {
  data: PropTypes.object.isRequired,
};
