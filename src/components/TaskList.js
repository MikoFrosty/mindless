import Header from "./Header";

export default function TaskList() {
  return (
    <div>
      <Header pageName="Task List" showProfileBtn={false} showBackBtn={true}/>
      <p>Edit Tasks</p>
    </div>
  );
}
