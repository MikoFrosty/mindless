import Header from "./Header";
import Footer from "./Footer";
import "./Profile.css";

export default function Profile({ user, logout, taskConfirm, setTaskConfirm }) {
  return (
    <>
      <Header pageName="Profile" hideProfileBtn={true} hideBackBtn={false} />
      <div id="profile-page">
        <h4>Logged in as: {user.email}</h4>
        <p>Profile editing currently unavailable</p>
        <div id="profile-options">
          <h3>Options</h3>
          <input
            type="checkbox"
            id="confirm"
            name="confirm"
            checked={taskConfirm}
            onChange={(e) => setTaskConfirm(e.target.checked)}
          />
          <label htmlFor="confirm">
            Require confirmation when completing tasks
          </label>
        </div>
        <button className="button" id="logout-button" onClick={logout}>
          Logout
        </button>
        <Footer />
      </div>
    </>
  );
}
