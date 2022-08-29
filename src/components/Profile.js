import Header from "./Header";
import "./Profile.css";

export default function Profile({ user, logout }) {
  return (
    <>
      <Header pageName="Profile" hideProfileBtn={true} hideBackBtn={false} />
      <div id="profile-page">
        <p>You are: {user.email}</p>
        <p>FORM AREA HERE</p>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
