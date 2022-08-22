import "./App.css";
import Login from "./Login";
import Register from "./Register";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });
  }, []);

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setLoginEmail("");
      setLoginPassword("");
      navigate("/home");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route exact path="/home" element={<h1>Home</h1>} />
        <Route
          exact
          path="/register"
          element={
            <Register
              onSubmit={register}
              registerEmail={registerEmail}
              setRegisterEmail={setRegisterEmail}
              registerPassword={registerPassword}
              setRegisterPassword={setRegisterPassword}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              onSubmit={login}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
            />
          }
        />
      </Routes>
      <Link to="/">Home</Link>
      <br />
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <p>CURRENT USER:</p>
      {user?.email ?? "No user"}
      <br />
      <br />
      <input type="button" value="Logout" onClick={logout} />
    </div>
  );
}

export default App;
