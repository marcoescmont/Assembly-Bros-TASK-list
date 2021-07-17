//GET LIST//

export const getList = userName => {
	return fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/${userName}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		}
	).then(response => {
		console.log(response.ok);
		console.error(response.status);
		return response.status === 200 ? response.json() : null;
	});
};

//CREATE LIST//

export const createList = () => {
	return fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/marcoescmont",
		{
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);
			console.log(resp.text());
			return resp.json();
		})
		.then(response => console.log(response))
		.then(() => getList("marcoescmont"))
		.catch(error => {
			console.log(error);
		});
};

//UPDATE LIST//

export const updateList = tasks => {
	return fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/marcoescmont",
		{
			method: "PUT",
			body: JSON.stringify(tasks),
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);
			console.log(resp.text());
			return resp.json();
		})

		.catch(error => {
			console.log(error);
		});
};

//DELETE LIST//

export const deleteList = () => {
	return fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/marcoescmont",
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		}
	)
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status);
			console.log(resp.text());
			return resp.json();
		})
		.then(response => console.log(response))

		.then(() => createList())
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});
};
