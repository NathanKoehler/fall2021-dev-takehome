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
	key: number;
	title: string;
	dueDate: Date;
	tagList: string[];
	completed: boolean;
};

export default function TodoList() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
  const [buttonPressed, isButtonPressed] = useState(false);

	const addTodo = (todo: TodoItem) => {
		console.log(todo);
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}

		todo.tagList.forEach((item) => {
			if (/^\s*$/.test(item)) return;
		});
		console.log(...todos);

		const newTodos = [todo, ...todos] as TodoItem[];
		setTodos(newTodos);
    isButtonPressed(false);
	};

	const editTodo = (key: number, todo: TodoItem): void => {
		if (!todo.title || /^\s*$/.test(todo.title)) {
			return;
		}
    
		todo.tagList.forEach((item) => {
			if (/^\s*$/.test(item)) return;
		});
		setTodos((prev) =>
			prev.map((item) => (item.key === key ? todo : item))
		);
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
		setTodos(updatedTodos);
	};

	const buttonHandler = () => {
		isButtonPressed(true);
	};

  let modal;

  if (buttonPressed) {
    modal = <TodoModal submit={addTodo} />;
  } else {
    modal = <button onClick={buttonHandler} className="add-todo-button">
              <i className="fas fa-plus-circle"></i>
            </button>;
  }

	return (
		<div>
			<h1>What will you do today?</h1>
				{modal}
			<Todo
				todos={todos}
				editTodo={editTodo}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
			/>
		</div>
	);
}
