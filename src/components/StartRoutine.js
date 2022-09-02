import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartRoutine.css";

export default function StartRoutine({ taskList, setTaskList }) {
  const [currentTask, setCurrentTask] = useState(0);
  
  const navigate = useNavigate();

  function handleTaskClick() {
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
        <p>No tasks to display</p>
      )}
    </div>
  );
}
