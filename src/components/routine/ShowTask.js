export default function ShowTask({ onTaskClick, currentTask, lastTask, additionalData, setAdditionalData }) {
  const dataType = currentTask.additionalDataType;

  function taskInput() {
    return (
      <div id="task-input">
        <input type="text" value={additionalData} placeholder="Enter data here" onChange={(e) => setAdditionalData(e.target.value)}/>
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
    </>
  );
}
