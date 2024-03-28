import { useState } from "react";
import "./App.css";

function CreateEditTask() {
  const [taskDetails, setTaskDetails] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const taskDetail = document.getElementById("taskDetail");
  const [index, setIndex] = useState(null);
  const [taskStatus, setTaskStatus] = useState(false);

  function onCreateButtonClick() {
    if (taskDetails) {
      const newTask = {
        id: taskList.length === 0 ? 0 : taskList[taskList.length - 1].id + 1,
        taskContent: taskDetails,
        status: "Pending",
      };
      setTaskList([...taskList, newTask]);
      setTaskDetails(null);
      taskDetail.value = "";
    }
  }

  function onUpdateButtonClick() {
    const updatedList = taskList;
    if (taskDetails) {
      updatedList[index].taskContent = taskDetails;
      setEditMode(false);
      setTaskDetails(null);
      taskDetail.value = "";
    }
    setTaskList(updatedList);
  }

  function onEditTaskClick(id) {
    setEditMode(true);
    setIndex(id);
    taskDetail.value = taskList[id].taskContent;
    setTaskDetails(taskList[id].taskContent);
  }

  function onDeleteTaskClick(id) {
    setTaskList(
      taskList.filter((item) => {
        return item.id !== id;
      })
    );
  }

  function onPendingTaskClick(id) {
    if (taskList[id].id === id) {
      if (taskList[id].status === "Pending") {
        taskList[id].status = "Completed";
        setTaskStatus(true);
      } else {
        taskList[id].status = "Pending";
        setTaskStatus(false);
      }
    }
  }

  return (
    <div>
      <div>
        <input
          id="taskDetail"
          placeholder="Enter a Task"
          onChange={(e) => setTaskDetails(e.target.value)}
        ></input>
        {editMode ? (
          <button onClick={onUpdateButtonClick}>Update</button>
        ) : (
          <button onClick={onCreateButtonClick}>Create</button>
        )}
      </div>
      <div>
        {taskList.map((task, id) => {
          return (
            <div key={id}>
              <h3>{task.taskContent}</h3>
              <button onClick={() => onEditTaskClick(task.id)}>Edit</button>
              <button id="status" onClick={() => onPendingTaskClick(task.id)}>
                {taskList[id].status}
              </button>
              <button onClick={() => onDeleteTaskClick(task.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <h1>To-do List</h1>
      <CreateEditTask />
    </>
  );
}
