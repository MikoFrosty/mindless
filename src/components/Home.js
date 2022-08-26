import { Link } from "react-router-dom";
import Header from "./Header";

export default function Home({ onLogoutClick, user }) {
  return (
    <div>
      <Header pageName="Home" showProfileBtn={true} user={user} showBackBtn={false}/>
      <p>Welcome, {user.email}</p>
      <Link to="/home/tasklist">Task List</Link>
      <input type="button" value="Logout" onClick={onLogoutClick} />
    </div>
  );
}
