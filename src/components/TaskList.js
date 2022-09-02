import Header from "./Header";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import Task from "./Task";
import { useState } from "react";
import "./TaskList.css";

export default function TaskList({ taskList, setTaskList }) {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskOrder, setNewTaskOrder] = useState(0);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskOrder, setEditTaskOrder] = useState(0);

  function handleAddTaskClick() {
    setShowAddTaskForm(true);
  }
  function handleEditTaskClick({ name, order }) {
    setEditTaskName(name);
    setEditTaskOrder(order);
    setShowEditTaskForm(true);
  }

  function handleAddTaskFormSubmit(e) {
    e.preventDefault();
    setTaskList(() =>
      [
        ...taskList,
        {
          name: newTaskName,
          order: newTaskOrder,
        },
      ].sort((a, b) => a.order - b.order)
    );
    setNewTaskName("");
    setNewTaskOrder(0);
    setShowAddTaskForm(false);
  }
  function handleEditTaskFormSubmit(e, originalName, originalOrder) {
    e.preventDefault();
    setTaskList(() => {
      return taskList
        .map((task) => {
          if (task.name === originalName && task.order === originalOrder) {
            return {
              ...task,
              name: editTaskName,
              order: editTaskOrder,
            };
          } else {
            return task;
          }
        })
        .sort((a, b) => a.order - b.order);
    });
    setEditTaskName("");
    setEditTaskOrder(0);
    setShowEditTaskForm(false);
  }

  function handleTaskDelete(name) {
    setTaskList(() => {
      return taskList.filter((task) => task.name !== name);
    });
  }

  return (
    <>
      <Header pageName="Task List" hideProfileBtn={true} hideBackBtn={false} />
      <div id="tasklist-page">
        {showAddTaskForm ? (
          <AddTaskForm
            setShowAddTaskForm={setShowAddTaskForm}
            onAddTaskFormSubmit={handleAddTaskFormSubmit}
            newTaskName={newTaskName}
            setNewTaskName={setNewTaskName}
            newTaskOrder={newTaskOrder}
            setNewTaskOrder={setNewTaskOrder}
          />
        ) : null}
        {showEditTaskForm ? (
          <EditTaskForm
            setShowEditTaskForm={setShowEditTaskForm}
            onEditTaskFormSubmit={handleEditTaskFormSubmit}
            editTaskName={editTaskName}
            setEditTaskName={setEditTaskName}
            editTaskOrder={editTaskOrder}
            setEditTaskOrder={setEditTaskOrder}
          />
        ) : null}
        <button id="add-task-button" onClick={handleAddTaskClick}>
          <i className="las la-plus-circle"></i> Add Task
        </button>
        <h3 id="task-list-label">Task List</h3>
        {taskList.length
          ? taskList.map((task, index) => (
              <Task
                key={index}
                task={task}
                onTaskDelete={handleTaskDelete}
                onEditTaskClick={handleEditTaskClick}
              />
            ))
          : "No tasks"}
      </div>
    </>
  );
}
