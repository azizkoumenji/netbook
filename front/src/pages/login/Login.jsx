import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="login">
      <div className="card">
        <h1>Login to Netbook</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button
          onClick={() => {
            login();
            navigate("/");
          }}
        >
          Login
        </button>
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
