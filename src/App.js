import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import Landing from "./components/Landing";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [taskList, setTaskList] = useState(() => JSON.parse(localStorage.getItem("taskList")) || []);

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
      navigate("/", { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Route exact path="/" element={<Landing />} />
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
              <TaskList taskList={taskList} setTaskList={setTaskList}/>
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
