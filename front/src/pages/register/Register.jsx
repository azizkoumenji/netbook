import "./register.scss";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register">
      <div className="card">
        <h1>Welcome to Netbook</h1>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="text" placeholder="Name" />
        <input type="date" placeholder="Birthday" />
        <button>Register</button>
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
