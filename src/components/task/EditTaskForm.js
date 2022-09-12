import { useRef } from "react";
import "./EditTaskForm.css";

export default function EditTaskForm({
  setShowEditTaskForm,
  onEditTaskFormSubmit,
  editTaskName,
  setEditTaskName,
  editTaskOrder,
  setEditTaskOrder,
}) {
  const { current: originalTaskName } = useRef(editTaskName);
  const { current: originalTaskOrder } = useRef(editTaskOrder);

  return (
    <div id="edit-task-form-div">
      <h3>Edit Task</h3>
      <form
        id="edit-task-form"
        onSubmit={(event) =>
          onEditTaskFormSubmit(event, originalTaskName, originalTaskOrder)
        }
      >
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          required
          pattern="^[ ]*[A-Za-z0-9]+[A-Za-z0-9 ]*"
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
