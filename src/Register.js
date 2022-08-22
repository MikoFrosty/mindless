export default function Register({
  onSubmit,
  registerEmail,
  setRegisterEmail,
  registerPassword,
  setRegisterPassword,
}) {
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
