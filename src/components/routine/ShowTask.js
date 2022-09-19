export default function ShowTask({
  onTaskClick,
  currentTask,
  lastTask,
  taskIndex,
  setTaskIndex,
  additionalData,
  setAdditionalData,
}) {
  const dataType = currentTask.additionalDataType;

  function taskInput() {
    if (dataType === "num") {
      return (
        <div id="task-input">
          <input
            type="number"
            value={additionalData}
            onChange={(e) => setAdditionalData(Number(e.target.value))}
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

  return (
    <>
      <h2>Current Task:</h2>
      <h3>{currentTask.name}</h3>
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
