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

  return (
    <div id="start-routine-page">
      <h2>Start Routine</h2>
      {taskList.length > 0 ? (
        <div id="current-task">
          <h3>{taskList[currentTask].name}</h3>
          <button id="next-task-button" onClick={handleTaskClick}>
            {lastTask() ? "Complete" : "Next Task"}
          </button>
        </div>
      ) : (
        <>
          <p>You have no current tasks!</p>
          <p>Please go back and add some using the edit/view tool.</p>
          <Link to="/home">Home</Link>
          <br />
          <Link to="/home/tasklist">Edit/View Tasks</Link>
        </>
      )}
    </div>
  );
}
