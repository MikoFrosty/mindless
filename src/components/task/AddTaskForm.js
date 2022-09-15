import "./AddTaskForm.css";

export default function AddTaskForm({
  setShowAddTaskForm,
  onAddTaskFormSubmit,
  newTaskName,
  setNewTaskName,
  newTaskOrder,
  setNewTaskOrder,
}) {
  function handleCancelClick() {
    setShowAddTaskForm(false);
    setNewTaskName("");
    setNewTaskOrder("0");
  }

  return (
    <div id="add-task-form-div">
      <h3>Add Task</h3>
      <form id="add-task-form" onSubmit={onAddTaskFormSubmit}>
        <label htmlFor="task-name">Task Name:</label>
        <input
          type="text"
          name="task-name"
          required
          pattern="^[ ]*[\S]+[\s\S]*"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <label htmlFor="task-order">Task Order:</label>
        <input
          value={newTaskOrder}
          required
          onChange={(e) => setNewTaskOrder(e.target.value)}
          type="number"
          name="task-order"
          min="0"
          max="1000"
          inputMode="numeric"
          pattern="[0-9]+"
        />
        <input className="button" type="submit" value="Add Task" />
        <button
          className="button"
          id="cancel-add-task-button"
          type="button"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
