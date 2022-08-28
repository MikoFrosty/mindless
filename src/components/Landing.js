import "./Landing.css";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div id="landing">
      <h1>MindLess</h1>
      <img src="./logo512.png" alt="mindless logo" />
      <Link className="login-button" to="/login">Login</Link>
      <Link className="register-button" to="/register">Create Account</Link>
    </div>
  );
}
