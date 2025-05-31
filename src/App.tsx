import React, { useEffect, useState } from "react";
import "./App.css";
import { TaskInput } from "./components/TaskInput";
import { TaskView } from "./components/TaskView";
import Header from "./components/Header";
import Alarms from "./components/Alarms";

export interface Task {
  // type for tasks
  id: number;
  name: string;
  dueDate: string;
  dueTime: string;
}

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [name, setName] = React.useState<string>("");
  const [dueDate, setDueDate] = React.useState<string>("");
  const [dueTime, setDueTime] = React.useState<string>("");
  const [view, setView] = useState<"input" | "confirmation" | "tasks">("input");

  const addTask = () => {
    if (!name || !dueDate || !dueTime) return; // check if all fields are filled

    const newTask: Task = {
      // create a new task object
      id: tasks.length + 1,
      name: name,
      dueDate: dueDate,
      dueTime: dueTime,
    };

    setTasks([...tasks, newTask]); // add the new task to the tasks array

    // reset the input fields ⬇️
    setName("");
    setDueDate("");
    setDueTime("");
    setView("confirmation");
    // ts also resets the inputs since they are frickin controlled components type shi 👍🏾☝🏾
  };

  useEffect(() => {
    if (view === "confirmation") {
      const timer = setTimeout(() => {
        setView("input");
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [view]);

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000 }}>
        <Header setView={setView} view={view} />
      </div>
      {view === "input" ? (
        TaskInput(
          name,
          setName,
          dueDate,
          setDueDate,
          dueTime,
          setDueTime,
          addTask
        )
      ) : view === "tasks" ? (
        TaskView(tasks, setTasks)
      ) : (
        <div>
          <h1>Task Added Successfully!</h1>
          <input
            type="button"
            value="Add Another Task"
            onClick={() => setView("input")}
          />
          <input
            type="button"
            value="View Tasks"
            onClick={() => setView("tasks")}
          />
        </div>
      )}

      <Alarms tasks={tasks} />
    </>
  );
}

export default App;
