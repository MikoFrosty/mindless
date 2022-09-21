import Header from "../Header";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useState, useEffect } from "react";
import "./TaskList.css";
import "./TaskForm.css";

export default function TaskList({ taskList, setTaskList }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskOrder, setTaskOrder] = useState("0");
  const [taskDataType, setTaskDataType] = useState("none");
  const [formType, setFormType] = useState("add");

  // Ensure that the task order is stored as a number
  useEffect(() => {
    if (typeof taskOrder !== "number") {
      setTaskOrder(Number.parseInt(taskOrder, 10));
    }
  }, [taskOrder]);

  function handleAddTaskClick() {
    setFormType("add");
    setShowTaskForm(true);
  }
  function handleEditTaskClick({ name, order, additionalDataType }) {
    setFormType("edit");
    setTaskName(name);
    setTaskOrder(order);
    setTaskDataType(additionalDataType);
    setShowTaskForm(true);
  }

  function handleTaskFormSubmit(
    e,
    originalName = undefined,
    originalOrder = undefined
  ) {
    e.preventDefault();
    const additionalData = e.target["additional-data"].value;

    if (formType === "edit") {
      // Check if new task order is already taken
      if (
        taskList.find(
          (task) => task.order === taskOrder && taskOrder !== originalOrder
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
                name: taskName.trim(),
                order: taskOrder,
                additionalDataType: additionalData,
              };
            } else {
              return task;
            }
          })
          .sort((a, b) => a.order - b.order);
      });
    } else {
      if (taskList.find((task) => task.order === taskOrder)) {
        alert("Task order already exists");
        return;
      }
      setTaskList(() =>
        [
          ...taskList,
          {
            name: taskName.trim(),
            order: taskOrder,
            additionalDataType: additionalData,
          },
        ].sort((a, b) => a.order - b.order)
      );
    }
    setTaskName("");
    setTaskOrder(0);
    setTaskDataType("none");
    setShowTaskForm(false);
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
        {showTaskForm ? (
          <TaskForm
            setShowTaskForm={setShowTaskForm}
            onTaskFormSubmit={handleTaskFormSubmit}
            taskName={taskName}
            setTaskName={setTaskName}
            taskOrder={taskOrder}
            setTaskOrder={setTaskOrder}
            taskDataType={taskDataType}
            setTaskDataType={setTaskDataType}
            formType={formType}
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
