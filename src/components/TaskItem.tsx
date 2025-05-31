import React from "react";
import type { Task } from "../App";

function convertDate(dateString: string): string {
  const new_ = dateString.split("-");
  return `${new_[1]}/${new_[2]}/${new_[0]}`;
}

export const TaskItem: React.FC<{ task: Task; onClick?: () => void }> = ({
  task,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgb(33, 33, 33)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
    >
      <p>{task.name}</p>
      <p>
        {convertDate(task.dueDate)} at {task.dueTime}
      </p>
    </li>
  );
};
