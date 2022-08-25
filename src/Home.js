import { Link } from "react-router-dom";

export default function Home({ onLogoutClick, user }) {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {user.email}</p>
      <Link to="/home/tasklist">Task List</Link>
      <input type="button" value="Logout" onClick={onLogoutClick} />
    </div>
  );
}
