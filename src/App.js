import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./components/Home";
import TaskList from "./components/TaskList";
import Profile from "./components/Profile";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [user]);

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
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home onLogoutClick={logout} user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/tasklist"
          element={
            <ProtectedRoute user={user}>
              <TaskList />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} logout={logout}/>
            </ProtectedRoute>
          }
        />
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
    </div>
  );
}

export default App;
