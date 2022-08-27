import Header from "./Header";
import Task from "./Task";

export default function TaskList() {
  return (
    <div>
      <Header pageName="Task List" hideProfileBtn={true} hideBackBtn={false}/>
      <button onClick={() => {}}>Add Task</button>
      <p>Task List</p>
      <Task />
    </div>
  );
}
