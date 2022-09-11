import { Link } from "react-router-dom";
import timeDuration from "../../utils/timeDuration";
import "./CompleteRoutine.css";

export default function CompleteRoutine({ taskList }) {

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
                  <td>{new Date(task.lastStart).toLocaleTimeString()}</td>
                  <td>{new Date(task.lastEnd).toLocaleTimeString()}</td>
                  <td>{timeDuration(task.lastStart, task.lastEnd)}</td>
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
