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
  const [tempTaskList, setTempTaskList] = useState(taskList);
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
    const newTaskList = tempTaskList.map((task, index) => {
      if (index === taskIndex) {
        return {
          ...task,
          lastStart:
            index === 0 ? routineStartTime : tempTaskList[index - 1].lastEnd,
          lastEnd: Date.now(),
          additionalData,
        };
      } else {
        return task;
      }
    });

    setTempTaskList(newTaskList);

    if (lastTask()) {
      setTaskList(newTaskList);
    } else {
      setTaskIndex(taskIndex + 1);
      setAdditionalData("");
    }
  }

  useEffect(() => {
    if (!skipCount) {
      onCompleteRoutine(routineStartTime, Date.now());
      navigate("/home/complete");
    }

    // Don't run on first render
    if (skipCount) setSkipCount(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);

  function lastTask() {
    return taskIndex === tempTaskList.length - 1;
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
        {tempTaskList.length > 0 ? (
          <ShowTask
            onTaskClick={handleTaskClick}
            currentTask={tempTaskList[taskIndex]}
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
