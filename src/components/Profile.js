import Header from "./Header";
import Footer from "./Footer";
import "./Profile.css";

export default function Profile({ user, logout }) {
  return (
    <>
      <Header pageName="Profile" hideProfileBtn={true} hideBackBtn={false} />
      <div id="profile-page">
        <h4>Logged in as: {user.email}</h4>
        <p>Profile editing currently unavailable</p>
        <button className="button" id="logout-button" onClick={logout}>Logout</button>
        <Footer />
      </div>
    </>
  );
}
