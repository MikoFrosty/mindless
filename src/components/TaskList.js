import Header from "./Header";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import "./TaskList.css";

export default function TaskList({ taskList, setTaskList }) {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskOrder, setNewTaskOrder] = useState(0);

  const handleAddTaskClick = () => {
    setShowAddTaskForm(true);
  };

  const handleAddTaskFormSubmit = (e) => {
    e.preventDefault();
    setTaskList(() => [
      ...taskList,
      {
        name: newTaskName,
        order: newTaskOrder,
      },
    ]);
    setNewTaskName("");
    setNewTaskOrder(0);
    setShowAddTaskForm(false);
  };

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const handleTaskDelete = (name) => {
    setTaskList(() => {
      return taskList.filter((task) => task.name !== name);
    });
  };

  return (
    <>
      <Header pageName="Task List" hideProfileBtn={true} hideBackBtn={false} />
      <div id="tasklist-page">
        {showAddTaskForm ? (
          <AddTaskForm
            setShowAddTaskForm={setShowAddTaskForm}
            handleAddTaskFormSubmit={handleAddTaskFormSubmit}
            newTaskName={newTaskName}
            setNewTaskName={setNewTaskName}
            newTaskOrder={newTaskOrder}
            setNewTaskOrder={setNewTaskOrder}
          />
        ) : null}
        <button id="add-task-button" onClick={handleAddTaskClick}>
          <i className="las la-plus-circle"></i> Add Task
        </button>
        <h3 id="task-list-label">Task List</h3>
        {taskList.length
          ? taskList
              .sort((a, b) => a.order - b.order)
              .map((task, index) => (
                <Task key={index} task={task} onTaskDelete={handleTaskDelete} />
              ))
          : "No tasks"}
      </div>
    </>
  );
}
