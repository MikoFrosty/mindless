import "./Task.css";

export default function Task({
  task,
  onTaskDelete,
  onEditTaskClick,
  onTaskDrop,
}) {
  const { name, order } = task;

  const handleTaskDragStart = (e) => {
    e.dataTransfer.setData("order", order);
    e.target.classList.add("dragging");
    e.target.style.cursor = "grabbing";
  };
  const handleTaskDragEnd = (e) => {
    e.target.classList.remove("dragging");
    e.target.classList.remove("over");
    e.target.style.cursor = "grab";
  };
  const handleTaskDragEnter = (e) => {
    if (!e.target.classList.contains("dragging") && e.target.classList.contains("task")) {
      e.target.classList.add("over");
    }
  };
  const handleTaskDragOver = (e) => {
    e.preventDefault();
  };
  const handleTaskDragLeave = (e) => {
    e.target.classList.remove("over");
    e.target.style.cursor = "grab";
  };
  const handleTaskDrop = (e) => {
    e.preventDefault();
    let orderA = e.dataTransfer.getData("order");
    if (orderA !== order) {
      onTaskDrop(orderA, order);
    }
    e.target.classList.remove("over");
    e.stopPropagation();
    e.target.style.cursor = "grab";
  };

  return (
    <div
      className="task"
      draggable="true"
      onDragStart={handleTaskDragStart}
      onDragOver={handleTaskDragOver}
      onDrop={handleTaskDrop}
      onDragEnd={handleTaskDragEnd}
      onDragEnter={handleTaskDragEnter}
      onDragLeave={handleTaskDragLeave}
    >
      <button
        className="task-edit-button"
        onClick={() => onEditTaskClick(task)}
      >
        <i className="las la-edit"></i>
      </button>
      <p className="task-name-display">{name}</p>
      <p className="task-order-display">Order: {order}</p>
      <button className="task-delete-button" onClick={() => onTaskDelete(name)}>
        <i className="las la-trash"></i>
      </button>
    </div>
  );
}
