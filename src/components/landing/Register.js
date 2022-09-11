import { Link } from "react-router-dom";
import "./Register.css";

export default function Register({
  onSubmit,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
}) {
  return (
    <div id="register-page">
      <h2>Create Account</h2>
      <form className="register-form" onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          type="text"
          name="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          pattern=".{6,}"
          type="password"
          name="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input className="button" type="submit" value="Register" />
      </form>
      <Link className="login-button button" to="/login">Login</Link>
    </div>
  );
}
