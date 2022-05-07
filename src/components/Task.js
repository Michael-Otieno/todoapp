import React from "react";

export default function Task(props) {
  const [isEditing, setIsEditing] = React.useState(false);

  const [newName, setNewName] = React.useState("");

  function handleChange(e) {
    setNewName(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setIsEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor={props.id}>Task to change: {props.name}</label>
        <input id={props.id} type="text" onChange={handleChange} />
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );

  const viewTemplate = (
      <div className="task--lst_btn" id={props.id}>
        <div className="input--para">
          <input
            className="checkbox"
            type="checkbox"
            id="completed"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <span className="task--list_icon">
            <i>---</i>
          </span>
          <p className="task--list_para">{props.name}</p>
        </div>
        <div>
          <button
            className="task--editbtn"
            type="button"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            EDIT
          </button>
          <button
            className="task--deletebtn"
            onClick={() => props.deleteTask(props.id)}
          >
            DELETE
          </button>
        </div>
      </div>
  );

  return (
    <div className="task--lst-btn">
      <div>{isEditing ? editingTemplate : viewTemplate}</div>
    </div>
  );
}

