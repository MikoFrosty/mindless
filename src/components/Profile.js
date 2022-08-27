import Header from "./Header";

export default function Profile({ user, logout }) {
  return (
    <div>
      <Header pageName="Profile" hideProfileBtn={true} hideBackBtn={false} />
      <p>You are: {user.email}</p>
      <p>FORM AREA HERE</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
