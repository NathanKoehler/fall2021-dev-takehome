import React, { useEffect, useState } from "react";
import "./TodoList.css";
import TodoModal from "./TodoModal";
import SortModal from "./SortModal";
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
export type TaskTag = {
  title: string;
  color: string;
}

export type TodoItem = {
  key: number;
  title: string;
  dueDate: Date;
  tagList: TaskTag[];
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [allTags, setAllTags] = useState(new Map());
  const [buttonPressed, isButtonPressed] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [sorting, setSorting] = useState<boolean[]>([false, false]);

  const addTodo = (todo: TodoItem) => {
    // tests for vulnerabilities or duplicates
    if (testTodo(todo)) return;

    const newTodos = [todo, ...todos] as TodoItem[];
    setTodos(sorted(sorting, newTodos));
    isButtonPressed(false);
  };

  const editTodo = (key: number, todo: TodoItem): void => {
    // tests for vulnerabilities or duplicates
    if (testTodo(todo)) return;

    setTodos((prev) => {
      return sorted(
        sorting,
        prev.map((item: TodoItem) => (item.key === key ? todo : item))
      );
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
    setTodos(sorted(sorting, updatedTodos));
  };

  const testTodo = (todo: TodoItem): boolean => {
    // removes a point of injection within titles
    if (/^\s*$/.test(todo.title)) {
      return true;
    }

    // if this is a duplicated todo, we need to throw it out
    let index = todos.findIndex((oldTodo) => oldTodo.key === todo.key);
    if (index > 0) {
      // we will mark the old todo as incomplete if a dup is made
      if (todos[index].completed) completeTodo(todo.key);
      return true;
    }

    // removes a point of injection within tags
    todo.tagList.forEach((tag) => {
      if (/^\s*$/.test(tag.title)) return true;
      // for later searching, adds the todo to a map
      
      if (!allTags.get(tag.title)) { // how we will be later searching for tags
        setAllTags(allTags.set(tag.title, [todo]));
      } else {
        setAllTags(allTags.set(tag.title, [...allTags.get(tag.title), todo]));
      }
    });

    return false;
  };

  const buttonHandler = () => {
    isButtonPressed(!buttonPressed);
    if (!buttonPressed) {
      setActivateModal(true);
    }
  };

  const [filterTag, setFilterTag] = useState("");

  const sortManager = (sortDate: boolean, sortCompleted: boolean, sortTag: string) => {
    if (sortTag) {
      setFilterTag(sortTag);
    } 
    if (sortDate !== sorting[0] || sortCompleted !== sorting[1]) {
      setTodos(sorted([sortDate, sortCompleted], todos));
      setSorting([sortDate, sortCompleted]);
    }
  };

  function filterUntagged ():TodoItem[] {
    return sorted(sorting, allTags.get(filterTag));
  }

  function sorted(conditions: boolean[], tasks: TodoItem[]): any {
    let sortedTasks = tasks;

    if (conditions[0]) {
      // sort by date
      sortedTasks.sort((a, b) => {
        return new Date(a.dueDate).valueOf() - new Date(b.dueDate).valueOf();
      });
    }

    if (conditions[1]) {
      // sort by completed, with incomplete set in front
      sortedTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return 0;
        } else {
          if (a.completed) return 1;
          else return -1;
        }
      });
    }

    return sortedTasks;
  }

  useEffect(() => {
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
    <div className="content">
      <div className="modal-border-wrapper">
        <div className={buttonPressed ? "modal-border active" : "modal-border"}>
          <div className="modal-content-initial">
            <h1>What's on your mind?</h1>
            <button onClick={buttonHandler} className="icon-btn">
              <div className="create-todo-btn">
                <i
                  className={
                    buttonPressed ? "fas fa-times-circle" : "fas fa-plus-circle"
                  }
                ></i>
              </div>
            </button>
          </div>
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
      <Fader
        state={(todos.length > 1)} // if there are todos, they need to be sorted
        delay={120}
        content={<SortModal sortManager={sortManager} />}
      />
      <section className="tasklist">
        <Task
          tasks={(filterTag.length > 0) ? filterUntagged() : todos}
          editTodo={editTodo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      </section>
    </div>
  );
}
