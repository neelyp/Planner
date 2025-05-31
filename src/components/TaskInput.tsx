import React from "react";

export function TaskInput(
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  dueDate: string,
  setDueDate: React.Dispatch<React.SetStateAction<string>>,
  dueTime: string,
  setDueTime: React.Dispatch<React.SetStateAction<string>>,
  addTask: () => void
) {
  return (
    <div>
      <h1>Add a task</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Enter Task Name"}
      ></input>
      <input
        value={dueDate}
        type="date"
        name="dueDate"
        id="dueDate"
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        value={dueTime}
        type="time"
        name="dueTime"
        id="dueTime"
        onChange={(e) => setDueTime(e.target.value)}
      />
      <input type="button" value="Add" onClick={addTask} />
    </div>
  );
}
