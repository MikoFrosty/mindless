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
        <button id="start-button" onClick={() => {}}>
        Start Routine
        </button>
        <Link id="tasklist-button" to="/home/tasklist">
        <i class="las la-edit"></i> EDIT/VIEW TASKS
        </Link>
      </div>
    </>
  );
}
