import React, { useState, useEffect, useRef } from "react";
import { getList, updateList, createList, deleteList } from "./api";
import PropTypes from "prop-types";
import ABlogo from "/ABlogo.png";

const TodoList = () => {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState("");

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	let makeList = tasks.map((item, i) => {
		return (
			<li
				className="d-flex justify-content-between hover list-group-item m-2 multi-bg"
				key={i}>
				{item.label === "sample task" ? setTasks([]) : item.label}
				<button
					className="bg-transparent border-0 text-white"
					onClick={() => removeTask(i)}>
					<i className="far fa-trash-alt"></i>
				</button>
			</li>
		);
	});

	let newTask = event => {
		if (event.keyCode === 13) {
			let userInput = { label: input, done: false };
			tasks.splice(tasks.length, 0, userInput);
			setTasks([...tasks]);
			setInput("");
			updateList(tasks);
		}
	};

	const removeTask = index => {
		tasks.splice(index, 1);
		setTasks([...tasks]);
		// tasks.length > 0
		// ?
		updateList(tasks).then(response => {
			setInput("");
			console.log(response);
		});
		// : deleteList().then(() =>
		// 		setTasks([{ label: "sample task", done: false }])
		//   );
	};

	useEffect(() => {
		getList("marcoescmont").then(data => {
			return data === null
				? createList().then(data => {
						setTasks(data);
				  })
				: setTasks(data);
		});
	}, []);

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a
					className="navbar-brand d-flex justify-content-start"
					href="#">
					<img
						alt="AB Logo"
						width="50px"
						height="50px"
						src={ABlogo}
					/>
					{"   "}
					<h2>Assembly Bros</h2>
				</a>
			</nav>
			<div className="listBody mx-auto mt-4">
				<h2 className="text-center">Help your client with...</h2>
				<input
					className="border-0 mx-2 mt-1 black-bg text-white w-75"
					type="text"
					id="fname"
					name="fname"
					onChange={e => setInput(e.target.value)}
					value={input}
					placeholder="Add your task..."
					onKeyDown={newTask}
					ref={inputRef}
				/>
				<ul className="list-group py-2"> {makeList}</ul>
				<p className="bg-dark border-round pl-2 d-flex justify-content-between">
					{tasks.length} Items left
					<button
						type="button"
						className="btn bg-transparent text-white"
						onClick={deleteList}>
						<i className="fas fa-minus-circle"></i>
					</button>
				</p>
			</div>
		</div>
	);
};

export default TodoList;
