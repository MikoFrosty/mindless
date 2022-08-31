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
      <div id="header-content">
        <button
          className={hideBackBtn ? "hide" : undefined}
          onClick={() => navigate(-1)}
        >
          <i className="las la-arrow-circle-left"></i>
        </button>
        <h2>{pageName}</h2>
        <Link
          to="/home/profile"
          id="profile-button"
          className={hideProfileBtn ? "hide" : undefined}
        >
          <i className="las la-user-circle"></i>
        </Link>
      </div>
    </div>
  );
}
