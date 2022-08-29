import Header from "./Header";
import Task from "./Task";

export default function TaskList() {
  return (
    <>
      <Header pageName="Task List" hideProfileBtn={true} hideBackBtn={false} />
      <div>
        <button onClick={() => {}}>Add Task</button>
        <p>Task List</p>
        {/* <Task /> */}
        <Task />
      </div>
    </>
  );
}
