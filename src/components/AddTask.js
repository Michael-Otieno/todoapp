import React from "react";

export default function AddTask(props) {
  const [taskInput, setTaskInput] = React.useState("");

  function handleChange(e) {
    setTaskInput(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addTask(taskInput);
    setTaskInput("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <button className="inputs">ADD TASK</button>

      <input
        className="form-search"
        type="text"
        placeholder="Add Task"
        value={taskInput}
        onChange={handleChange}
      />
    </form>
  );
}
