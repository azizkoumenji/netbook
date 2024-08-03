import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="card">
        <h1>Login to Netbook</h1>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={async () => {
            try {
              await login({ username: username, password: password });
              navigate("/");
            } catch (err) {
              console.log(err);
              setError(err.response.data);
            }
          }}
        >
          Login
        </button>
        {error && <span className="error">{error}</span>}
        <p>
          Don&apos;t have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
