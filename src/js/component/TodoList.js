import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TodoList = () => {
    const [tasks, setTasks] = useState(["New task"]);
    
    	const fetchTodo = () => {

    //  fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont")
		// .then(response => response.json())
		// .then(todos => console.log(todos))
        // .catch(error => console.log(error));
            
		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcoescmont", {
			method: "PUT",
			body: JSON.stringify(""),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
    };
    
    

	useEffect(() => {
		fetchTodo();
	}, []);

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current.focus();
	});

	let makeList = tasks.map((item, i) => {
		return (
			<li
				className="d-flex justify-content-between hover list-group-item m-2 multi-bg"
				key={i}>
				{item}
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
			let userInput = event.target.value;
			const newTaskList = [...tasks, userInput];
			setTasks(newTaskList);
			event.target.value = "";
		}
	};

	const removeTask = index => {
		const removeArr = tasks.filter((item, i) => i != index);
		setTasks(removeArr);
	};

	return (
		<div className="listBody mx-auto mt-4">
			<h2 className="text-center">What{"'"}s up to task</h2>
			<input
				className="border-0 mx-2 mt-1 black-bg text-white w-75"
				type="text"
				id="fname"
				name="fname"
				placeholder="Add your task..."
				onKeyDown={newTask}
				ref={inputRef}
			/>
			<ul className="list-group py-2"> {makeList}</ul>
			<p className="bg-dark border-round pl-2">
				{tasks.length} Items left
			</p>
		</div>
	);
};

export default TodoList;
