import React, { useState } from "react";
import "./TodoList.css";
import TodoModal from "./TodoModal";
import Todo from "./Todo";

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
	title: string;
	dueDate: Date;
	tagList: string[];
	completed: boolean;
};

export default function TodoList() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
  
	const addTodo = (todo: TodoItem) => {
    console.log(todo);
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}

    console.log("asd");

		todo.tagList.forEach((item) => {
			if (/^\s*$/.test(item)) return;
		});
    console.log("asd");
    console.log(...todos);

		const newTodos = [todo, ...todos] as TodoItem[];
		setTodos(newTodos);
	};

  const removeTodo = (title:string) => {
    const removedArr = [...todos].filter(todo => todo.title !== title);
    setTodos(removedArr);
  };

  const completeTodo = (title:string) => {
    let updatedTodos = todos.map(todo => {
      if (todo.title === title) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

	return (
		<div>
			<TodoModal submit={addTodo}/>
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
		</div>
	);
}
