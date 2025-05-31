import React, { useEffect, useState } from "react";
import type { Task } from "../App";

// Extend the Window interface to include electronAPI
declare global {
  interface Window {
    electronAPI?: {
      notify?: (title: string, body: string) => void;
    };
  }
}

interface Props {
  tasks: Task[];
}

const Alarms: React.FC<Props> = ({ tasks }) => {
  const [now, setNow] = useState<Date>(new Date());
  const [notify, setNotify] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());

      tasks.forEach((task) => {
        if (notify.has(task.id)) return;

        const msg = countDown(task);
        if (msg === "due now") {
          window.electronAPI?.notify?.("Task Due", `${task.name} is due now!`);
          setNotify(new Set(notify).add(task.id));
        }
      });
    }, 1000); // Update every second
    return () => clearInterval(timer); // Cleanup on unmount
  }, [tasks, notify]);

  const countDown = (task: Task) => {
    const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
    const diff = dueDateTime.getTime() - now.getTime();
    if (diff < 0) {
      return "due now";
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000,
        background: "white",
        padding: "1rem",
        borderTopRightRadius: "10px",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
        backgroundColor: "rgba(213, 71, 71, 0.9)",
      }}
    >
      <p>Alarms:</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.name}</strong> - {countDown(task)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alarms;
