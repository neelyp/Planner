import React from "react";

type HeaderProps = {
  setView: React.Dispatch<
    React.SetStateAction<"input" | "confirmation" | "tasks">
  >;
  view: "input" | "confirmation" | "tasks";
};

const Header: React.FC<HeaderProps> = ({ setView, view }) => {
  return (
    <header
      style={{
        marginBottom: ".5rem",
        marginLeft: ".5rem",
        marginTop: ".5rem",
      }}
    >
      {view !== "input" ? (
        <input
          type="button"
          value="Add Task"
          onClick={() => setView("input")}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div></div>
      )}
      <input
        type="button"
        value="View Tasks"
        onClick={() => setView("tasks")}
        style={{ marginLeft: "1rem", cursor: "pointer" }}
      />
    </header>
  );
};

export default Header;
