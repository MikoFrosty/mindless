import "./Task.css";

export default function Task({ task, onTaskDelete }) {
  const { name, order } = task;

  const handleTaskDragStart = (e) => {
    e.target.style.opacity = "0.4";
    // stop propagation of the event to prevent the browser from dragging the element
    e.stopPropagation();
  };
  const handleTaskDragEnd = (e) => {
    e.target.style.opacity = "1";
    e.target.classList.remove("over");
  };

  const handleTaskDragOver = (e) => {
    e.preventDefault();
  };

  const handleTaskDragEnter = (e) => {
    //e.target.style.backgroundColor = "lightblue";
    e.target.classList.add("over");
  };
  const handleTaskDragLeave = (e) => {
    e.target.classList.remove("over");
    //e.target.style.backgroundColor = "white";
  };

  
  const handleTaskDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove("over");
    e.stopPropagation();
    //const data = e.dataTransfer.getData("text");
    //onTaskDelete(data);
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
      <button className="edit" onClick={() => {}}>
        Edit
      </button>
      <p>Name: {name}</p>
      <p>Order: {order}</p>
      <button className="delete" onClick={() => onTaskDelete(name)}>
        Delete
      </button>
    </div>
  );
}
