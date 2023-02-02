import { useState, useEffect } from "react";
import "./ShowTask.css";

export default function ShowTask({
  onTaskClick,
  currentTask,
  lastTask,
  taskIndex,
  setTaskIndex,
  additionalData,
  setAdditionalData,
}) {
  let dataType = currentTask?.additionalDataType ?? "ERROR - NO DATA TYPE";
  const [taskStartTime, setTaskStartTime] = useState(Date.now() - 1000);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) {
      onTaskClick(null, skipped);
      setSkipped(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipped]);

  useEffect(() => {
    setTaskStartTime(() => Date.now() - 1000);
  }, [taskIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function taskInput() {
    if (dataType === "num") {
      return (
        <div id="task-input">
          <input
            type="number"
            value={additionalData}
            onChange={(e) => setAdditionalData(e.target.value)}
            placeholder="Enter a number..."
            inputMode="decimal"
            pattern="[0-9.]+"
          />
        </div>
      );
    }
    return (
      <div id="task-input">
        <input
          type="text"
          value={additionalData}
          pattern="^[ ]*[\S]+[\s\S]*"
          placeholder="Enter text..."
          onChange={(e) => setAdditionalData(e.target.value)}
        />
      </div>
    );
  }

  function handleSkipTaskClick() {
    setAdditionalData("skipped");
    setSkipped(true);
  }

  return (
    <>
      <p>
        {new Date(currentTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </p>
      <h2>{currentTask?.name ?? "ERROR - NO NAME"}</h2>
      <button className="button" id="next-task-button" onClick={onTaskClick}>
        {lastTask() ? (
          "Complete"
        ) : (
          <p>
            Done <span className="no-break small">(Next Task)</span>
          </p>
        )}
      </button>
      {(dataType === "text" || dataType === "num") && taskInput()}
      <div>
        <p>
          {new Date(currentTime - taskStartTime)
            .toISOString()
            .substring(11, 19)}
        </p>
      </div>
      {/* Back button */}
      {taskIndex > 0 && (
        <button
          className="button"
          id="previous-task-button"
          onClick={() => setTaskIndex((prev) => prev - 1)}
        >
          <i className="las la-chevron-left"></i>
          Previous Task
        </button>
      )}
      {/* Skip task button */}
      <button
        className="button"
        id="skip-task-button"
        onClick={handleSkipTaskClick}
      >
        Skip This Task
        <i className="las la-chevron-right"></i>
      </button>
    </>
  );
}
