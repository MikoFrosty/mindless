import TaskGraph from './TaskGraph';
import timeDuration from '../utils/timeDuration';

export default function ExpandedView({
  taskData: { taskList },
  startDate,
  setExpandedTask,
}) {
  const names = taskList.map((task) => task.name);
  const starts = taskList.map((task) => task.lastStart);
  const ends = taskList.map((task) => task.lastEnd);
  const notes = taskList.map((task) => task.additionalData);

  return (
    <div className="expanded-view">
      <button className="close-button button" onClick={() => setExpandedTask(-1)}>
        <i className="las la-times"></i>
      </button>
      <h2>Expanded View of Timestamp For:</h2>
      <p>{startDate}</p>
        <TaskGraph names={names} starts={starts} ends={ends} notes={notes}/>
      <h3>All Tasks</h3>
      <table className="expanded-view-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Start</th>
            <th>Duration</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>
                {new Date(starts[index]).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  second: "numeric",
                })}
              </td>
              <td>
                {timeDuration(starts[index], ends[index])}
              </td>
              <td>{notes[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="expanded-bottom-close-button button" onClick={() => setExpandedTask(-1)}>
        Close
      </button>
    </div>
  );
}
