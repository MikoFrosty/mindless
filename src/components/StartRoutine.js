import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./StartRoutine.css";

export default function StartRoutine({ taskList, setTaskList }) {
  const [currentTask, setCurrentTask] = useState(0);
  const { current: routineStartTime } = useRef(Date.now());

  const navigate = useNavigate();

  function handleTaskClick() {
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task, index) => {
        if (index === currentTask && index === 0) {
          return {
            ...task,
            startTime: routineStartTime,
            endTime: Date.now(),
          };
        } else if (index === currentTask) {
          return {
            ...task,
            startTime: prevTaskList[index - 1].endTime,
            endTime: Date.now(),
          };
        } else {
          return task;
        }
      });
    });
    lastTask() ? navigate("/home/complete") : setCurrentTask(currentTask + 1);
  }

  function lastTask() {
    return currentTask === taskList.length - 1;
  }

  function CurrentTask() {
    return (
      <>
        <h2>Current Task:</h2>
        <h3>{taskList[currentTask].name}</h3>
        <button id="next-task-button" onClick={handleTaskClick}>
          {lastTask() ? "Complete" : "Next Task"}
        </button>
      </>
    );
  }

  function NoTask() {
    return (
      <>
        <p>No current tasks!</p>
        <p className="no-tasks-desc">Please go back and add some using the edit/view tool.</p>
        <Link id="home-button" to="/home">Home</Link>
      </>
    );
  }

  return (
    <div id="start-routine-page">
      <div id="current-task">{taskList.length > 0 ? <CurrentTask /> : <NoTask />}</div>
    </div>
  );
}
