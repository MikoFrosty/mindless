import { useState, useEffect } from "react";

export default function ShowTask({
  onTaskClick,
  currentTask,
  lastTask,
  taskIndex,
  setTaskIndex, // May be used for future feature
  additionalData,
  setAdditionalData,
}) {
  let dataType = currentTask.additionalDataType;
  const [taskStartTime, setTaskStartTime] = useState(Date.now() - 1000);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) {
      onTaskClick();
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
      <h2>{currentTask.name}</h2>
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
      {/* add skip task button */}
      <button
        className="button"
        id="skip-task-button"
        onClick={handleSkipTaskClick}
      >
        Skip This Task
      </button>
      {/*  // does not work, but maybe add feature later
      {taskIndex > 0 && (
        <button
          className="button"
          id="previous-task-button"
          onClick={(prev) => setTaskIndex(prev - 1)}
        >
          Previous Task
        </button>
      )}
        */}
    </>
  );
}
