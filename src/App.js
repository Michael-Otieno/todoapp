import React from "react";
import "./styles.css";
import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import Filterbtns from "./components/Filterbtns";
import data from "./data";
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP); //keys

function App() {
  const [taskList, setTaskList] = React.useState(data);
  const [currentFilter, setCurrentFilter] = React.useState(FILTER_NAMES[0]); //state to be filtered

  const filtered = taskList.filter(FILTER_MAP[currentFilter])
  // const filteredListName = FILTER_NAMES;

  // const [activeList, setActiveList] = React.useState(filteredListName[0]); //default list

  const taskItems = filtered.map((todo) => {
    return (
      <Task
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        key={todo.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    );
  });

  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;

  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTaskList(updatedTasks);
  }

  function addTask(name) {
    const newTask = { id: nanoid(), name: name, completed: false };
    setTaskList([...taskList, newTask]);
  }

  function deleteTask(id) {
    const remTasks = taskList.filter((todo) => id !== todo.id);
    setTaskList(remTasks);
  }

  function editTask(id, newName) {
    const editTaskList = taskList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, name: newName };
      }
      return todo;
    });
    setTaskList(editTaskList);
  }

  return (
    <div className="App">
      <Header />
      <AddTask addTask={addTask} />
      <div>
        <div className="task--list-btn">
          <Filterbtns
            taskList={taskList}
            filterNames={FILTER_NAMES}
            onFilter={setCurrentFilter}
          />

          <div className="task--lst">
            <h2>TASKS</h2>
            <h3>{headingText}</h3>
            {taskItems}
          </div>
        </div>
        <div>No task Available</div>
      </div>
    </div>
  );
}

export default App;
