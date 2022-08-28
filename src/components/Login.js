import { Link } from "react-router-dom";
import "./Login.css";

export default function Login({
  onSubmit,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) {
  return (
    <div id="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
      <Link className="register-button" to="/register">Create Account</Link>
    </div>
  );
}
