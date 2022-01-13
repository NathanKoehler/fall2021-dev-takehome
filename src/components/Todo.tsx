import React from "react";
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
	return (
		<div className="todo-wrapper">
			{props.todos &&
				props.todos.map((todo) => {
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
										props.completeTodo(todo.title)
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
												props.editTodo(todo.key)
											}
										>e</p>
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
				})}
		</div>
	);
}
