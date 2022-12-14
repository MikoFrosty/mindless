import { Link } from "react-router-dom";
import Header from "./Header";
import "./Home.css";

export default function Home({ user }) {
  return (
    <>
      <Header
        pageName="Home"
        hideProfileBtn={false}
        user={user}
        hideBackBtn={true}
      />
      <div id="home-page">
        <Link className="button" id="start-button" to="/home/start">
          Start Routine
        </Link>
        <Link className="button" id="tasklist-button" to="/home/tasklist">
          <i className="las la-edit"></i> EDIT/VIEW TASKS
        </Link>
        <Link className="button" id="history-button" to="/home/history">
          <i className="las la-history"></i> VIEW HISTORY
        </Link>
      </div>
    </>
  );
}
