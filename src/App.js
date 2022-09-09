import "./App.css";
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
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import StartRoutine from "./components/StartRoutine";
import CompleteRoutine from "./components/CompleteRoutine";
import TaskList from "./components/TaskList";
import Profile from "./components/Profile";
import Landing from "./components/Landing";

import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [user, setUser] = useState({});
  const [userDoc, setUserDoc] = useState({});
  let navigate = useNavigate();

  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      getDoc(doc(db, "users", user.uid))
        .then((d) => {
          console.log("Database Document Exists for User: " + d.exists());
          if (d.exists()) {
            setUserDoc(d.data());
            setTaskList(d.data().taskList);
          } else {
            throw new Error("No Document Exists");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      updateDoc(doc(db, "users", user.uid), {
        taskList: taskList,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

  async function register(e) {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      // Create new documents in firestore Database
      setDoc(doc(db, "users", user.uid), {
        taskList: [],
        email: registerEmail, 
      });
      setDoc(doc(db, "timestamps", user.uid), {
        lastStart: 0, 
        lastEnd: 0, 
        timestamps: [],
      })
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(
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
  }

  async function logout(e) {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleCompleteRoutine(start, end) {
    updateDoc(doc(db, "timestamps", user.uid), {
      lastStart: start,
      lastEnd: end,
      timestamps: arrayUnion({ start, end, taskList }),
    });
  }

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
          path="/home/start"
          element={
            <ProtectedRoute user={user}>
              <StartRoutine taskList={taskList} setTaskList={setTaskList} onCompleteRoutine={handleCompleteRoutine}/>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/complete"
          element={
            <ProtectedRoute user={user}>
              <CompleteRoutine taskList={taskList} />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/tasklist"
          element={
            <ProtectedRoute user={user}>
              <TaskList taskList={taskList} setTaskList={setTaskList} />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} logout={logout} />
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
