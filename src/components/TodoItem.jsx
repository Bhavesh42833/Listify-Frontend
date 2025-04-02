import React from "react";
import{Delete} from "@mui/icons-material"
import {Button } from "@mui/material"
import "../styles/app.scss";

const TodoItem = ({
  title,
  description,
  IsCompleted,
  updateHandler,
  deleteHandler,
  time_tag,
  deadline,
  id,
}) => {
  return (
    <div className="todo">
      <div>
        <h3>{title}</h3>
        <p >{description}</p>
      </div>
      <div>
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={IsCompleted}
        />
        <Button onClick={() => deleteHandler(id)} >
          <Delete style={{color:"red"}}/>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
