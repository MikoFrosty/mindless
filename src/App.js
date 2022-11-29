import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth } from "./utils/firebase-config";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./components/landing/Login";
import Register from "./components/landing/Register";
import Home from "./components/Home";
import StartRoutine from "./components/routine/StartRoutine";
import CompleteRoutine from "./components/routine/CompleteRoutine";
import TaskList from "./components/task/TaskList";
import History from "./components/History";
import Profile from "./components/Profile";
import Landing from "./components/landing/Landing";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [taskConfirm, setTaskConfirm] = useState(false);
  const [user, setUser] = useState({});
  const [demo, setDemo] = useState(false);
  const [error, setError] = useState("");
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
          //console.log("Database Document Exists for User: " + d.exists());
          if (d.exists()) {
            setTaskList(d.data().taskList);
            setTaskConfirm(d.data().taskConfirm);
          } else {
            throw new Error("No Document Exists");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
          setError(true);
        });

      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
      setDemo(false);
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

  useEffect(() => {
    if (user?.uid) {
      updateDoc(doc(db, "users", user.uid), {
        taskConfirm: taskConfirm,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskConfirm]);

  async function register(e) {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Create new documents in firestore Database
      setDoc(doc(db, "users", user.uid), {
        taskList: [],
        email: email,
        taskConfirm: false,
      });
      setDoc(doc(db, "timestamps", user.uid), {
        lastStart: 0,
        lastEnd: 0,
        timestamps: [],
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      //console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function logout() {
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

  async function getHistory() {
    const timestampRaw = await getDoc(
      doc(db, "timestamps", user.uid ?? "guest")
    );
    return timestampRaw.data() ?? [];
  }

  async function handleTimestampDelete(timestamp) {
    await updateDoc(doc(db, "timestamps", user.uid), {
      timestamps: arrayRemove(timestamp),
    });
  }

  function handleDemoClick(e) {
    setEmail("guest@guest.com");
    setPassword("password");
    setDemo(e);
  }

  useEffect(() => {
    if (demo) {
      login(demo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo]);

  if (error) {
    return (
      <div className="App">
        <br />
        <br />
        <h1>Something went wrong</h1>
        <code>(database error)</code>
        <br />
        <br />
        <p>Don't worry, we're working on it</p>
        <p>Try again a little later and things should be fixed</p>
        <p>We apologize for any inconvenience</p> 
      </div>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<Landing onDemoClick={handleDemoClick} />}
        />
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
              <StartRoutine
                taskList={taskList}
                setTaskList={setTaskList}
                onCompleteRoutine={handleCompleteRoutine}
                taskConfirm={taskConfirm}
              />
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
          path="/home/history"
          element={
            <ProtectedRoute user={user}>
              <History
                getHistory={getHistory}
                onTimestampDelete={handleTimestampDelete}
              />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/home/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile
                user={user}
                logout={logout}
                taskConfirm={taskConfirm}
                setTaskConfirm={setTaskConfirm}
              />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <Register
              onSubmit={register}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onDemoClick={handleDemoClick}
            />
          }
        />
        <Route
          exact
          path="/login"
          element={
            <Login
              onSubmit={login}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              onDemoClick={handleDemoClick}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
