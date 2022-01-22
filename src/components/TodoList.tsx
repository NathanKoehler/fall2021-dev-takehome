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
  color: string;
  dueDate: Date;
  tagList: TaskTag[];
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [allTags, setAllTags] = useState(new Map());
  const [filterTag, setFilterTag] = useState("");
  const [buttonPressed, isButtonPressed] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [sorting, setSorting] = useState<boolean[]>([false, false]);

  const addTodo = (todo: TodoItem) => {
    // tests for vulnerabilities or duplicates
    if (testTodo(todo, -1)) return;

    const newTodos = [todo, ...todos] as TodoItem[];
    setTodos(sorted(sorting, newTodos));
    isButtonPressed(false);
  };

  const editTodo = (key: number, todo: TodoItem): void => {
    let todoIndex:number = todos.findIndex((item) => item.key === key);
    // tests for vulnerabilities or duplicates
    if (testTodo(todo, todoIndex)) return;

    let unsortedTodos = todos;

    unsortedTodos[todoIndex] = todo;

    setTodos((prev) => {
      return sorted(
        sorting,
        unsortedTodos
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

/*  todo is the todo needed to be tested, isNew is the bool
    used to determine if the second test, the duplicate todo
    test, is run. It is not run if we are dealing with old
    todos that are being edited, as they will show up as
    duplicates. */
  const testTodo = (todo: TodoItem, oldIndex: number): boolean => {
    // removes a point of injection within titles
    if (/^\s*$/.test(todo.title)) {
      return true;
    }

    if (oldIndex < 0) { // run if the todo is new
      // if this is a duplicated todo, we need to throw it out
      let index = todos.findIndex((oldTodo) => oldTodo.key === todo.key);
      if (index > 0) {
        // we will mark the old todo as incomplete if a dup is made BUT ONY IF THIS IS FROM ADDTODO
        if (todos[index].completed) completeTodo(todo.key);
        return true;
      }
    }

    if (oldIndex >= 0) {
      console.log("lmao");
      let newTags = allTags;

      let difference = todos[oldIndex].tagList.filter(x => !todo.tagList.includes(x));
      difference.forEach((tag) => {
        // deletes the todo from the tags that it is listed under that are no longer there
        let reducedArray:TodoItem[] = newTags.get(tag.title).filter((x:TodoItem) => x.title !== todo.title);
        if (reducedArray.length < 1) {
          newTags.delete(tag.title);
        } else {
          newTags.set(tag.title, reducedArray);
        }
      });
      setAllTags(newTags);

      let difference2 = todo.tagList.filter(x => !todos[oldIndex].tagList.includes(x));
      difference2.forEach((tag) => {
        // removes a point of injection within tags
        if (/^\s*$/.test(tag.title)) return true;

        // for later searching, adds the todo to a map
        if (!newTags.get(tag.title)) { // how we will be later searching for tags
          setAllTags(newTags.set(tag.title, [todo]));
        } else {
          setAllTags(newTags.set(tag.title, [...newTags.get(tag.title), todo]));
        }
      });
    } else {
      todo.tagList.forEach((tag) => {
        // removes a point of injection within tags
        if (/^\s*$/.test(tag.title)) return true;

        // for later searching, adds the todo to a map
        if (!allTags.get(tag.title)) { // how we will be later searching for tags
          setAllTags(allTags.set(tag.title, [todo]));
        } else {
          setAllTags(allTags.set(tag.title, [...allTags.get(tag.title), todo]));
        }
      });
    }
    console.log(allTags);

    return false;
  };


  const buttonHandler = () => {
    isButtonPressed(!buttonPressed);
    if (!buttonPressed) {
      setActivateModal(true);
    }
  };


  const sortManager = (sortDate: boolean, sortCompleted: boolean, sortTag: string) => {
    if (sortTag !== filterTag) {
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
    if (!tasks || tasks.length < 2) {
      // if there are less than 2 tasks, there is no point in sorting them
      return tasks;
    }
    
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
