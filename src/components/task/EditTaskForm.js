import { useRef } from "react";
import "./EditTaskForm.css";

export default function EditTaskForm({
  setShowEditTaskForm,
  onEditTaskFormSubmit,
  editTaskName,
  setEditTaskName,
  editTaskOrder,
  setEditTaskOrder,
  taskDataType,
  setTaskDataType,
}) {
  const { current: originalTaskName } = useRef(editTaskName);
  const { current: originalTaskOrder } = useRef(editTaskOrder);
  const { current: originalTaskDataType } = useRef(taskDataType);

  return (
    <div id="edit-task-form-div">
      <h3>Edit Task</h3>
      <form
        id="edit-task-form"
        onSubmit={(event) =>
          onEditTaskFormSubmit(event, originalTaskName, originalTaskOrder, originalTaskDataType)
        }
      >
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          required
          pattern="^[ ]*[\S]+[\s\S]*"
          name="task-name"
          value={editTaskName}
          onChange={(e) => setEditTaskName(e.target.value)}
        />
        <label htmlFor="task-order">Task Order:</label>
        <input
          value={editTaskOrder}
          onChange={(e) => setEditTaskOrder(e.target.value)}
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
          id="additional-data"
          onChange={(e) => setTaskDataType(e.target.value)}
        >
          <option value="none">None</option>
          <option value="text">Text</option>
          <option value="num">Number</option>
        </select>
        <input className="button" type="submit" value="Edit Task" />
        <button
          className="button"
          id="cancel-edit-task-button"
          type="button"
          onClick={() => setShowEditTaskForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
