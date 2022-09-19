import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ShowTask from "./ShowTask";
import "./StartRoutine.css";

export default function StartRoutine({
  taskList,
  setTaskList,
  taskConfirm,
  onCompleteRoutine,
}) {
  const [taskIndex, setTaskIndex] = useState(0);
  const [additionalData, setAdditionalData] = useState("");
  const { current: routineStartTime } = useRef(Date.now());
  const [skipCount, setSkipCount] = useState(true);

  const navigate = useNavigate();

  function handleTaskClick() {
    if (taskConfirm) {
      const confirm = window.confirm(
        `Move on to the next task? You will not be able to go back to this task.`
      );
      if (!confirm) {
        return;
      }
    }
    setTaskList((prevTaskList) => {
      return prevTaskList.map((task, index) => {
        if (index === taskIndex) {
          return {
            ...task,
            lastStart:
              index === 0 ? routineStartTime : prevTaskList[index - 1].lastEnd,
            lastEnd: Date.now(),
            additionalData,
          };
        } else {
          return task;
        }
      });
    });
  }

  useEffect(() => {
    // Don't run on first render
    if (skipCount) setSkipCount(false);
    if (!skipCount) {
      if (lastTask()) {
        onCompleteRoutine(routineStartTime, Date.now());
        navigate("/home/complete");
      } else {
        setTaskIndex((prevIndex) => prevIndex + 1);
        setAdditionalData("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

  function lastTask() {
    return taskIndex === taskList.length - 1;
  }

  function NoTask() {
    return (
      <>
        <p>No current tasks!</p>
        <p className="no-tasks-desc">
          Please go back and add some using the edit/view tool.
        </p>
        <Link className="button" id="home-button" to="/home">
          Home
        </Link>
      </>
    );
  }

  return (
    <div id="start-routine-page">
      <div id="current-task">
        {taskList.length > 0 ? (
          <ShowTask
            onTaskClick={handleTaskClick}
            currentTask={taskList[taskIndex]}
            lastTask={lastTask}
            taskIndex={taskIndex}
            setTaskIndex={setTaskIndex}
            additionalData={additionalData}
            setAdditionalData={setAdditionalData}
          />
        ) : (
          <NoTask />
        )}
      </div>
    </div>
  );
}
