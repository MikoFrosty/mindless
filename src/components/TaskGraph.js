import { useState } from "react";
import timeDuration from "../utils/timeDuration";

export default function TaskGraph({ names, starts, ends, notes }) {
  const routineDurationMs = ends[ends.length - 1] - starts[0];
  const [taskInfo, setTaskInfo] = useState({});

  function randomTaskColor(task) {
    const colors = [
      "#003f5c",
      "#d45087",
      "#2f4b7c",
      "#f95d6a",
      "#665191",
      "#ff7c43",
      "#a05195",
      "#ffa600",
    ];
    const color = colors[task % colors.length];
    return color;
  }

  function taskDivs() {
    const divs = [];
    for (let i = 0; i < names.length; i++) {
      const task = names[i];
      const start = starts[i];
      const end = ends[i];
      const note = notes[i];
      const durationMs = end - start;
      const duration = timeDuration(start, end);
      const div = (
        <div
          onMouseOver={() => setTaskInfo({ task, duration, note })}
          onMouseOut={() => setTaskInfo({})}
          key={i}
          className="task-graph-task"
          style={{
            height: 50,
            width: (durationMs / routineDurationMs) * 100 + "%",
            backgroundColor: randomTaskColor(i),
          }}
        ></div>
      );
      divs.push(div);
    }
    return divs;
  }

  function taskHoverInfo() {
    return (
      <div className="task-hover-info">
        <span className="task-hover-info-name">{taskInfo.task}:</span>
        <span className="task-hover-info-duration">{taskInfo.duration}</span>
        {taskInfo.note && (
          <p>
            Note: <span className="task-hover-info-note">{taskInfo.note}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="task-graph-container">
      <h3>Task Graph</h3>
      <div className="task-graph">
      <div className="graph-start-time">
          {new Date(starts[0]).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            second: "numeric",
          })}
        </div>
        <div className="graph-end-time">
          {new Date(ends[ends.length - 1]).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            second: "numeric",
          })}
        </div>
        {taskDivs()}
      </div>
      <div className="task-graph-task-info">
        {taskInfo.task
          ? taskHoverInfo()
          : "Hover/click a color to see more info"}
      </div>
    </div>
  );
}
