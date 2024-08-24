import { useContext, useState } from "react";
import "./update.scss";
import { AuthContext } from "../../context/authContext";
import PropTypes from "prop-types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Update({ setShowUpdate }) {
  const [cover, setCover] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    birthday: currentUser.birthday.substr(0, 10),
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const upload = async (img) => {
    if (img) {
      try {
        const formData = new FormData();
        formData.append("img", img);
        const imgName = await axios.post("/api/uploads", formData);
        const imgLink = "/api/uploads/" + imgName.data;
        return imgLink;
      } catch (err) {
        console.log(err);
      }
    }
    return null;
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (user) => {
      try {
        await axios.put("/api/users", user);
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  const handleSave = async () => {
    const coverLink = await upload(cover);
    const profilePicLink = await upload(profilePic);
    const user = {
      cover_pic: cover ? coverLink : currentUser.cover_pic,
      profile_pic: profilePic ? profilePicLink : currentUser.profile_pic,
      name: inputs.name,
      username: inputs.username,
      email: inputs.email,
      birthday: inputs.birthday,
    };
    console.log(user);
    mutation.mutate(user);
    localStorage.setItem(
      "user",
      JSON.stringify({ id: currentUser.id, ...user })
    );
    setShowUpdate(false);
    window.location.reload();
  };

  return (
    <div className="background-update" onClick={() => setShowUpdate(false)}>
      <div className="card-update" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="cover_pic">
          <i className="bi bi-image"></i> Upload new cover picture
        </label>
        <label htmlFor="profile_pic">
          <i className="bi bi-image"></i> Upload new profile picture
        </label>

        <input
          type="file"
          name="cover_pic"
          id="cover_pic"
          style={{ display: "none" }}
          onChange={(e) => setCover(e.target.files[0])}
        />

        <input
          type="file"
          id="profile_pic"
          name="profile_pic"
          style={{ display: "none" }}
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
        <label htmlFor="name">Name</label>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>

        <input
          type="text"
          name="username"
          placeholder="Userame"
          value={inputs.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email</label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleChange}
        />
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          name="birthday"
          value={inputs.birthday}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

Update.propTypes = {
  setShowUpdate: PropTypes.func.isRequired,
};
