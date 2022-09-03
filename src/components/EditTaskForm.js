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
      <form
        id="edit-task-form"
        onSubmit={(event) =>
          onEditTaskFormSubmit(event, originalTaskName, originalTaskOrder)
        }
      >
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          name="task-name"
          value={editTaskName}
          onChange={(e) => setEditTaskName(e.target.value)}
        />
        <label htmlFor="task-order">Task Order:</label>
        <input
          value={editTaskOrder}
          onChange={(e) =>
            setEditTaskOrder(Number.parseInt(e.target.value, 10))
          }
          type="number"
          name="task-order"
          min="0"
          max="1000"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input type="submit" value="Edit Task" />
        <button
          id="cancel-edit-task-button"
          onClick={() => setShowEditTaskForm(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
