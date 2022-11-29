import styles from './Form.module.css';

export default function Form({ onSubmit, email, setEmail, password, setPassword }) {

    return (
        <form className={styles["auth-form"]} onSubmit={onSubmit}>
        <label htmlFor="email">Email: <span className={styles["validation-error-text"]}>{email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) || email === "" ? "" : "Not a valid email"}</span></label>
        <input
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password: <span className={styles["validation-error-text"]}>{password.match(/.{6,}/) || password === "" ? "" : "Must be 6 characters"}</span></label>
        <input
          required
          pattern=".{6,}"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="button" type="submit" value="Login" />
      </form>
    );
}