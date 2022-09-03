import { Link } from "react-router-dom";
import "./CompleteRoutine.css";

export default function CompleteRoutine({ taskList }) {
  function timeDuration(start, end) {
    let time = end - start;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${
      seconds + "s"
    }`;
  }

  return (
    <div id="complete-routine-page">
      <h2>Routine Completed</h2>
      <h3>Performance Breakdown:</h3>
      <div id="table-container">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{new Date(task.startTime).toLocaleTimeString()}</td>
                  <td>{new Date(task.endTime).toLocaleTimeString()}</td>
                  <td>{timeDuration(task.startTime, task.endTime)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link id="home-button" to="/home">
        Home
      </Link>
    </div>
  );
}
