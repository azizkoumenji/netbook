import { useContext, useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
  });

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/auth/register", inputs);
      await login({ username: inputs.username, password: inputs.password });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <h1>Welcome to Netbook</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />
        <input type="date" name="birthday" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {error && <span className="error">{error}</span>}
        <p>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
