import React, { useState } from "react";
import { TodoItem } from "./TodoList";
import TodoModal from "./TodoModal";
import "./TodoList.css";
import "./Task.css";
import Fader from "./Fader";

interface TaskProps {
  tasks: TodoItem[];
  editTodo: any;
  completeTodo: any;
  removeTodo: any;
}

export default function Task(props: TaskProps) {
  const [editingTodo, setEditingTodo] = useState<TodoItem | undefined>(
    undefined // this stores a task that is currently being edited or undefined
  );

  // called when the edited todo is submitted,
  const modTodo = (task: TodoItem) => {
    props.editTodo(task.key, task);
    setEditingTodo(undefined);
  };

  // takes in a task, assigns it to editingTodo and cancels early if the given task is already complete
  const editHandler = (task: TodoItem): void => {
    // a call to edit a specific task
    if (task.completed) return; // returns if no task is defined
    setEditingTodo(task); // sets the task to be edited
  };

  return (
    <div className="task-wrapper">
      {props.tasks &&
        props.tasks.map((task) => {
          if (editingTodo && task.key === editingTodo.key) {
            // if edit mode is active, display the edit modal
            return (
              <div className="modal edit" key={task.key}>
                <Fader
                  content={<TodoModal current={editingTodo} submit={modTodo} />}
                />
              </div>
            );
          } else {
            return (
              <div
                style={{backgroundColor: `${task.color}`}}
                className={task.completed ? "task complete" : "task"}
                key={task.key}
              >
                <div className="inner-task">
                  <div className="task-top">
                    <div
                      className="task-text"
                      onClick={() => props.completeTodo(task.key)}
                    >
                      <h2 className="task-title">
                        {task.title}
                        <label className="menu-icon accept">
                          <i
                            className={
                              task.completed
                                ? "far fa-check-square"
                                : "far fa-square"
                            }
                          ></i>
                        </label>
                      </h2>
                      <p className="task-dueDate">{task.dueDate}</p>
                    </div>
                    <div className="menu">
                      <div
                        className={
                          task.completed ? "menu-icon grayed" : "menu-icon edit"
                        }
                      >
                        <p
                          onClick={
                            () =>
                              editHandler(
                                task
                              ) /* goes into edit mode for the task */
                          }
                        >
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
                        <div key={index} style={{backgroundColor: `${tag.color}`}} className="tag-wrapper">
                          <h5 className="tag-title">{tag.title}</h5>
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
