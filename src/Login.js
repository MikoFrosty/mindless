export default function Login({
  onSubmit,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
}) {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
