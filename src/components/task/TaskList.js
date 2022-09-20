import Header from "../Header";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import "./TaskList.css";
import "./TaskForm.css";

export default function TaskList({ taskList, setTaskList }) {
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskOrder, setNewTaskOrder] = useState("0");
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskOrder, setEditTaskOrder] = useState("0");
  const [taskDataType, setTaskDataType] = useState("none");

  // Ensure that the task order is stored as a number
  useEffect(() => {
    if (typeof newTaskOrder !== "number") {
      setNewTaskOrder(Number.parseInt(newTaskOrder, 10));
    }
  }, [newTaskOrder]);
  useEffect(() => {
    if (typeof editTaskOrder !== "number") {
      setEditTaskOrder(Number.parseInt(editTaskOrder, 10));
    }
  }, [editTaskOrder]);

  function handleAddTaskClick() {
    setShowAddTaskForm(true);
  }
  function handleEditTaskClick({ name, order, additionalDataType }) {
    setEditTaskName(name);
    setEditTaskOrder(order);
    setTaskDataType(additionalDataType);
    setShowEditTaskForm(true);
  }

  function handleAddTaskFormSubmit(e) {
    e.preventDefault();
    const additionalData = e.target["additional-data"].value;
    
    if (taskList.find((task) => task.order === newTaskOrder)) {
      alert("Task order already exists");
      return;
    }
    setTaskList(() =>
      [
        ...taskList,
        {
          name: newTaskName.trim(),
          order: newTaskOrder,
          additionalDataType: additionalData,
        },
      ].sort((a, b) => a.order - b.order)
    );
    setNewTaskName("");
    setNewTaskOrder(0);
    setShowAddTaskForm(false);
  }
  function handleEditTaskFormSubmit(e, originalName, originalOrder, originalDataType) {
    e.preventDefault();
    const additionalData = e.target["additional-data"].value;

    // Check if new task order is already taken
    if (
      taskList.find(
        (task) =>
          task.order === editTaskOrder && editTaskOrder !== originalOrder
      )
    ) {
      alert("Task order already exists");
      return;
    }
    setTaskList(() => {
      return taskList
        .map((task) => {
          if (task.name === originalName && task.order === originalOrder) {
            return {
              ...task,
              name: editTaskName.trim(),
              order: editTaskOrder,
              additionalDataType: additionalData,
            };
          } else {
            return task;
          }
        })
        .sort((a, b) => a.order - b.order);
    });
    setEditTaskName("");
    setEditTaskOrder(0);
    setTaskDataType("none");
    setShowEditTaskForm(false);
  }

  function handleTaskDelete(name) {
    const confirm = window.confirm(
      `Are you sure you want to delete this task?`
    );
    if (confirm) {
      setTaskList(() => {
        return taskList.filter((task) => task.name !== name);
      });
    }
  }

  function handleTaskDrop(orderA, orderB) {
    setTaskList(() => {
      return taskList
        .map((task) => {
          if (task.order === orderA) {
            return {
              ...task,
              order: orderB,
            };
          } else if (task.order === orderB) {
            return {
              ...task,
              order: orderA,
            };
          } else {
            return task;
          }
        })
        .sort((a, b) => a.order - b.order);
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
            taskDataType={taskDataType}
            setTaskDataType={setTaskDataType}
          />
        ) : null}
        <button
          className="button"
          id="add-task-button"
          onClick={handleAddTaskClick}
        >
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
                onTaskDrop={handleTaskDrop}
              />
            ))
          : "No tasks"}
      </div>
    </>
  );
}
