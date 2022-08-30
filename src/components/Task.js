import "./Task.css";

export default function Task({ task }) {
  const { name, order } = task;
  
  return (
    <div className="task">
      <button className="edit" onClick={() => {}}>
        Edit
      </button>
      <p>Name: {name}</p>
      <p>Order: {order}</p>
      <button className="delete" onClick={() => {}}>
        Delete
      </button>
    </div>
  );
}
