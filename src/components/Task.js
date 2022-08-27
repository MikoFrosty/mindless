import "./Task.css";

export default function Task() {
    return (
        <div className="task">
            <button className="edit" onClick={() => {}}>Edit</button>
            <p>{"Task 1"}</p>
            <button className="delete" onClick={() => {}}>Delete</button>
        </div>
    );
}