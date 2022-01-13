import React, { useState } from "react";
import { TodoItem } from "./TodoList";
import TodoModal from "./TodoModal";
import "./TodoList.css";
import "./Todo.css";

interface TodoProps {
  tasks: TodoItem[];
  editTodo: any;
  completeTodo: any;
  removeTodo: any;
}

export default function Todo(props: TodoProps) {
  const [editingTodo, setEditingTodo] = useState<TodoItem | undefined>(
    undefined
  );

  const modTodo = (task: TodoItem) => {
    props.editTodo(task.key, task);
    setEditingTodo(undefined);
  };

  const editHandler = (task: TodoItem): void => {
    if (task.completed) return;
    setEditingTodo(task);
  };

  return (
    <div className="task-wrapper">
      {props.tasks &&
        props.tasks.map((task) => {
          if (editingTodo && task.key === editingTodo.key) {
            return (
              <div className="modal edit" key={task.key}>
                <TodoModal current={editingTodo} submit={modTodo} />
              </div>
            );
          } else {
            return (
              <div
                className={task.completed ? "task complete" : "task"}
                key={task.key}
              >
                <div className="inner-task">
                  <div className="task-top">
                    <div
                      className="task-text"
                      onClick={() => props.completeTodo(task.key)}
                    >
                      <h2 className="task-title">{task.title}</h2>
                      <p className="task-dueDate">{task.dueDate}</p>
                    </div>
                    <div className="menu">
                      <div
                        className={
                          task.completed ? "menu-icon grayed" : "menu-icon edit"
                        }
                      >
                        <p onClick={() => editHandler(task)}>
                          <i className="fas fa-edit"></i>
                        </p>
                      </div>
                      <div className="menu-icon delete">
                        <p onClick={() => props.removeTodo(task.key)}>
                          <i className="fas fa-trash-alt"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tags-container">
                    {task.tagList.map((tag, index) => {
                      return (
                        <div key={index} className="tag-wrapper">
                          <h5 className="tag-title">{tag}</h5>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}
