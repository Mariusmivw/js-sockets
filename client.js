const ws = new WebSocket('ws://localhost:3000', 'json');
ws.addEventListener('open', () => {
	const data = {
		msg: 'hello'
	}
	ws.send(JSON.stringify(data));
});
ws.addEventListener('message', (event) => {
	const data = JSON.parse(event.data)
	console.log(data);
});