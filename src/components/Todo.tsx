import React, { useState } from "react";
import { TodoItem } from "./TodoList";
import TodoModal from "./TodoModal";
import "./Todo.css";

interface TodoProps {
	todos: TodoItem[];
	editTodo: any;
	completeTodo: any;
	removeTodo: any;
}

export default function Todo(props: TodoProps) {
	const [editingTodo, setEditingTodo] = useState<TodoItem | undefined>(
		undefined
	);

	const modTodo = (todo: TodoItem) => {
		props.editTodo(todo.key, todo);
		setEditingTodo(undefined);
	};

	const editHandler = (todo: TodoItem): void => {
		if (todo.completed)
			return;
		setEditingTodo(todo);
	};

	return (
		<div className="todo-wrapper">
			{props.todos &&
				props.todos.map((todo) => {
					if (editingTodo && todo.key === editingTodo.key) {
						return (
							<div key={todo.key}>
								<TodoModal current={editingTodo} submit={modTodo} />
							</div>
						);
					} else {
						return (
							<div
								className={
									todo.completed ? "task complete" : "task"
								}
								key={todo.key}
							>
								<div className="inner-task">
									<div
										className="task-text"
										onClick={() =>
											props.completeTodo(todo.key)
										}
									>
										<div>{todo.title}</div>
										<div>{todo.dueDate}</div>
										<div>
											{todo.tagList.map((tag, index) => {
												return (
													<div key={index}>
														<h5>{tag}</h5>
													</div>
												);
											})}
										</div>
									</div>
									<div className="menu">
										<div className="edit">
											<p
												onClick={() =>
													editHandler(todo)
												}
											>
												e
											</p>
										</div>
										<div className="delete">
											<p
												onClick={() =>
													props.removeTodo(todo.key)
												}
											>
												d
											</p>
										</div>
									</div>
								</div>
							</div>
						);
					}
				})}
		</div>
	);
}
