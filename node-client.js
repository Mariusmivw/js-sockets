const WebSocket = require('ws');
const EventEmitter = require('events');

class Socket extends EventEmitter {
	constructor(url) {
		super();
		const patt = /^(.*?)(?=s?:)/;
		const ws = (this._ws = new WebSocket(
			url.startsWith('/')
				? 'ws://localhost' + url
				: url.includes('://')
				? url.replace(patt, 'ws')
				: 'ws://' + url,
			{ perMessageDeflate: false }
		));
		ws.addEventListener('open', () => super.emit('ready'));
		ws.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			super.emit(data.event, ...data.data);
		});
	}

	emit(event, ...data) {
		this._ws.send(JSON.stringify({ event, data }));
	}
}

module.exports = Socket;