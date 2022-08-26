import Header from "./Header";

export default function Profile() {
  return (
    <div>
      <Header pageName="Profile" showProfileBtn={false} showBackBtn={true} />
      <p>Edit Profile</p>
    </div>
  );
}
