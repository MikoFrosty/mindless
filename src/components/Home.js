import { Link } from "react-router-dom";
import Header from "./Header";

export default function Home({ onLogoutClick, user }) {
  return (
    <div>
      <Header pageName="Home" hideProfileBtn={false} user={user} hideBackBtn={true}/>
      <br />
      <button onClick={() => {}}>Start Routine</button>
      <br />
      <br />
      <Link to="/home/tasklist">Task List</Link> 
    </div>
  );
}
