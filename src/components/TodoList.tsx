import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoModal from "./TodoModal";
import Task from "./Task";
import Fader from "./Fader";

/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any
 * parts of this project. That includes changing the types.ts, creating css files,
 * modifying import statements, using contexts, etc. We do recommend to keep it simple.
 * You will not be judged based on complexity. We also recommend using
 * multiple components instead of coding everything on this file :)
 *
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 *
 * Bits of Good Engineering Team
 *
 */
// TODO: Start coding from here

// Here's a baseline todo item type.
// Feel free to extend or create your own interface!
export type TodoItem = {
  key: number;
  title: string;
  dueDate: Date;
  tagList: string[];
  completed: boolean;
};

export type SortData = {
  completedNum: number;
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [buttonPressed, isButtonPressed] = useState(false);

  const addTodo = (todo: TodoItem) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    todo.tagList.forEach((item) => {
      if (/^\s*$/.test(item)) return;
    });
    const newTodos = [todo, ...todos] as TodoItem[];
    setTodos(sorted([true, true], newTodos));
    isButtonPressed(false);
  };

  const editTodo = (key: number, todo: TodoItem): void => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }

    todo.tagList.forEach((item) => {
      if (/^\s*$/.test(item)) return;
    });
    setTodos((prev) => {
		return sorted([true, true], (prev.map((item:TodoItem) => (item.key === key ? todo : item))))
	});
  };

  const removeTodo = (key: number): void => {
    const removedArr = [...todos].filter((todo) => todo.key !== key);
    setTodos(removedArr);
  };

  const completeTodo = (key: number): void => {
    let updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
	setTodos(sorted([true, true], updatedTodos));
  };

  const [activateModal, setActivateModal] = useState(false);

  const buttonHandler = () => {
    isButtonPressed(!buttonPressed);
    if (!buttonPressed) {
      setActivateModal(true);
    }
  };

  function sorted(conditions: boolean[], tasks: TodoItem[]): any {
    const sortedTasks = tasks;
    if (conditions[0]) {
      // sort by date
      sortedTasks.sort((a, b) => {
		  return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf()
		});
	  console.log("sort by date");
    }
	if (false) {
		sortedTasks.sort((a, b) => (b.completed === a.completed) ? 0 : (b.completed ? 1 : 0));
    }
	console.log(sortedTasks);
	return tasks;
  }

  useEffect(() => {
    console.log("cleared timeout");
    const timer = activateModal
      ? undefined
      : setTimeout(() => {
          setActivateModal(false);
        }, 300);
    return () => {
      clearTimeout(timer as NodeJS.Timeout);
    };
  }, [activateModal]);

  return (
    <div>
      <div className="modal-border-wrapper">
        <div className={buttonPressed ? "modal-border active" : "modal-border"}>
          <h1>What will you do today?</h1>
          <button onClick={buttonHandler} className="icon-btn">
            <div className="create-todo-btn">
              <i
                className={
                  buttonPressed ? "fas fa-times-circle" : "fas fa-plus-circle"
                }
              ></i>
            </div>
          </button>
          {activateModal && (
            <div // this is the task entry modal; it has a class t/f to add a small animation
              className={buttonPressed ? "modal entry active" : "modal entry"}
            >
              <Fader
                state={buttonPressed}
                delay={120}
                content={<TodoModal submit={addTodo} />}
              />
            </div>
          )}
        </div>
      </div>
      <section className="tasklist">
        <Task
          tasks={todos}
          editTodo={editTodo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      </section>
    </div>
  );
}
