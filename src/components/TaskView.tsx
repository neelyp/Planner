import React from "react";
import { Task } from "../App";
import { TaskItem } from "./TaskItem";

export function TaskView(
  tasks: Task[],
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
  return (
    <>
      <h1>Your Tasks:</h1>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete the task " + task.name + "?"
                )
              ) {
                setTasks(tasks.filter((t) => t.id !== task.id));
              }
            }} // delete task when it clicked
            key={task.id}
            task={task}
          />
        ))}
      </ul>
    </>
  );
}
