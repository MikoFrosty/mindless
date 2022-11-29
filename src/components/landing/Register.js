import { Link } from "react-router-dom";
import { useEffect } from "react";
import Form from "./Form";
import styles from "./Landing.module.css";

export default function Register({
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  onDemoClick,
}) {
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [setEmail, setPassword]);
  return (
    <div className={styles["auth-page-container"]}>
      <h2 className={styles["auth-h2"]}>Create Account</h2>
      <Form onSubmit={onSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
      <Link className={`${styles["login-button"]} button`} to="/login">
        Already have an account?
      </Link>
      <Link className="demo-button button" to="#" onClick={onDemoClick}>
        Demo (no login required)
      </Link>
    </div>
  );
}
