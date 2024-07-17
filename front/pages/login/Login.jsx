import "./login.scss";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login">
      <div className="card">
        <h1>Login to Netbook</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <p>
          Don&apos;t have an account? <Link to="/register">Register.</Link>
        </p>
      </div>
    </div>
  );
}
