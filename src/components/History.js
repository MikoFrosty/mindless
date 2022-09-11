import { useEffect, useState } from "react";
import timeDuration from "../utils/timeDuration";
import Header from "./Header";
import "./History.css";

export default function History({ getHistory, onTimestampDelete }) {
  const [history, setHistory] = useState({});
  const [historyUpdated, setHistoryUpdated] = useState(0);

  useEffect(() => {
    async function getHistoryData() {
      const data = await getHistory();
      setHistory(() => data);
    }
    getHistoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyUpdated]);

  function handleDeleteClick(tsData) {
    // prompt user to confirm deletion
    const confirm = window.confirm(
      `Are you sure you want to delete this timestamp?`
    );
    if (confirm) {
      onTimestampDelete(tsData).then(() =>
        setHistoryUpdated((prev) => prev + 1)
      );
    }
  }

  const historyList = history?.timestamps
    ?.map((timestamp, index, arr) => {
      const startDate = new Date(timestamp.start).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const startTime = new Date(timestamp.start).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        second: "numeric",
      });
      const endTime = new Date(timestamp.end).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        second: "numeric",
      });
      const duration = timeDuration(timestamp.start, timestamp.end);

      return (
        <tr key={index}>
          <td>{startDate}</td>
          <td>{startTime}</td>
          <td>{endTime}</td>
          <td>{duration}</td>
          <td className="td-timestamp-delete">
            <button
              className="timestamp-delete-button button"
              onClick={() => handleDeleteClick(arr[index])}
            >
              <i className="las la-trash"></i>
            </button>
          </td>
        </tr>
      );
    })
    .reverse();

  return (
    <>
      <Header pageName="History" hideProfileBtn={true} hideBackBtn={false} />
      <div id="history-page">
        <h2>Run Times for Default Routine</h2>
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <th>Date (Top - Recent)</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>{historyList}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
