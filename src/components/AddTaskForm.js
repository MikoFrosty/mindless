import "./AddTaskForm.css";

export default function AddTaskForm({
  setShowAddTaskForm,
  handleAddTaskFormSubmit,
  newTaskName,
  setNewTaskName,
  newTaskOrder,
  setNewTaskOrder,
}) {
  return (
    <div id="add-task-form-div">
      <form id="add-task-form" onSubmit={handleAddTaskFormSubmit}>
        <label htmlFor="task-name">Task Name:</label>
        <input type="text" name="task-name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}/>
        <label htmlFor="task-order">Task Order:</label>
        <input
          value={newTaskOrder}
          onChange={(e) => setNewTaskOrder(e.target.value)}
          type="number"
          name="task-order"
          min="0"
          max="1000"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input type="submit" id="add-task-button" value="Add Task" />
      </form>
      <button
        id="cancel-add-task-button"
        onClick={() => setShowAddTaskForm(false)}
      >
        Cancel
      </button>
    </div>
  );
}