import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header({
  hideBackBtn,
  pageName,
  hideProfileBtn,
  onLogoutClick,
  user,
}) {
  const navigate = useNavigate();
  return (
    <div id="header">
      <button className={hideBackBtn ? "hide" : undefined} onClick={() => navigate(-1)}>
        Back
      </button>
      <h1>{pageName}</h1>
      <Link to="/home/profile" className={hideProfileBtn ? "hide" : undefined}>
        Profile
      </Link>
    </div>
  );
}
