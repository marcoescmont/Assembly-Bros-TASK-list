import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TodoList = () => {
	const [tasks, setTasks] = useState(["New task"]);
	const [input, setInput] = useState("");

	//CREATE LIST//

	const createUser = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(response => console.log(response))
			.then(() => getList())
			.catch(error => {
				console.log(error);
			});
	};

	//GET LIST//

	const getList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				console.log(response.ok);
				console.error(response.status);
				return response.json();
			})
			.then(data => {
				setTasks(data);
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	//UPDATE LIST//

	const updateList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont", {
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(response => {
				setInput("");
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
	};

	//DELETE LIST//

	const deleteList = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				console.log(resp.status);
				console.log(resp.text());
				return resp.json();
			})
			.then(response => console.log(response))
			.then(() => setTasks([]))
			.then(() => createUser())
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

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
			updateList();
		}
	};

	const removeTask = index => {
		tasks.splice(index, 1);
		setTasks([...tasks]);
		tasks.length > 0 ? updateList() : deleteList();
	};

	useEffect(() => {
		tasks.length > 0 ? getList() : createUser();
	}, []);

	return (
		<div className="listBody mx-auto mt-4">
			<h2 className="text-center">What{"'"}s up to task</h2>
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
	);
};

export default TodoList;
