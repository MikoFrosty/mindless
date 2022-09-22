import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Login.css";

export default function Login({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
}) {
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [setEmail, setPassword]);
  return (
    <div id="login-page">
      <h2>Login</h2>
      <form className="login-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          pattern=".{6,}"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="button" type="submit" value="Login" />
      </form>
      <Link className="register-button button" to="/register">
        Need to create an account?
      </Link>
    </div>
  );
}
