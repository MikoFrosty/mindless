import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({
  showBackBtn,
  pageName,
  showProfileBtn,
  onLogoutClick,
  user,
}) {
  const navigate = useNavigate();
  return (
    <div id="header">
      <button className={showBackBtn || "hide"} onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{pageName}</h1>
      <Link to="/home/profile" className={showProfileBtn || "hide"}>
        Profile
      </Link>
    </div>
  );
}
