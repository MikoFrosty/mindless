import { useRef } from "react";

export default function EditTaskForm({
  setShowTaskForm,
  onTaskFormSubmit,
  taskName,
  setTaskName,
  taskOrder,
  setTaskOrder,
  taskDataType,
  setTaskDataType,
  formType,
}) {
  const { current: originalTaskName } = useRef(taskName);
  const { current: originalTaskOrder } = useRef(taskOrder);
  //const { current: originalTaskDataType } = useRef(taskDataType); // Not needed, but may be useful in the future

  function handleCancelClick() {
    setShowTaskForm(false);
    setTaskName("");
    setTaskOrder("0");
    setTaskDataType("none");
  }

  return (
    <div className="task-form-div">
      <h3>{formType === "add" ? "Add Task" : "Edit Task"}</h3>
      <form
        className="task-form"
        onSubmit={(event) =>
          onTaskFormSubmit(event, originalTaskName, originalTaskOrder)
        }
      >
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          required
          pattern="^[ ]*[\S]+[\s\S]*"
          name="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <label htmlFor="task-order">Task Order:</label>
        <input
          value={taskOrder}
          onChange={(e) => setTaskOrder(e.target.value)}
          type="number"
          required
          name="task-order"
          min="0"
          max="1000"
          inputMode="numeric"
          pattern="[0-9]+"
        />
        <label htmlFor="additional-data">Task Data Collection Type:</label>
        <select
          value={taskDataType}
          name="additional-data"
          className="additional-data"
          onChange={(e) => setTaskDataType(e.target.value)}
        >
          <option value="none">None</option>
          <option value="text">Text</option>
          <option value="num">Number</option>
        </select>
        <input
          className="button"
          type="submit"
          value={formType === "add" ? "Add Task" : "Save"}
        />
        <button
          className="button cancel-task-button"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
