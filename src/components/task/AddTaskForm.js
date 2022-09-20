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
    <div className="task-form-div">
      <h3>Add Task</h3>
      <form className="task-form" onSubmit={onAddTaskFormSubmit}>
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
        <label htmlFor="additional-data">Task Data Collection Type:</label>
        <select
          defaultValue="none"
          name="additional-data"
          className="additional-data"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          <option value="none">None</option>
          <option value="text">Text</option>
          <option value="num">Number</option>
        </select>
        <input className="button" type="submit" value="Add Task" />
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
