
class WebSocketService {
    static instance = null;
    callbacks = {};
    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance
    }

    constructor() {
        this.socketRef = null;
    }

    connect () {
        const path = 'ws://127.0.0.1:8000/ws/chat/test';
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('websocket open')
        };
        this.socketRef.onmessage = e => {
            // passing a message
        }
        this.socketRef.onerror = e => {
            console.log(e.message)
        }
        this.socketRef.onclose = () => { 
            console.log('websocket is closed')
            this.connect();
        }
    }
    socketNewMessage(data) {
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === 'messages') {
            this.callbacks[command](parsedData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parsedData.message)
        }
    }

    fetchMessages(username){
        this.sendMessage({ command: 'fetch_messages', 'username': username});

    }

    newChatMessage(message){
        this.sendMessage({ command: 'new_message', from: message.from, message: message.content});
        
    }

    addCallbacks(messagesCallback, newMessageCallback){
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
    }

    sendMessage(data){
        try {
            this.socketRef.send(JSON.stringify({...data}))
        }catch(err) {
            console.log(err)
        }
    }

    state() {
        return this.socketRef.readyState;
    }
    waitForSocketConnection(callback) {
        const socket = this.socketRef;
        const recusion = this.waitForSocketConnection
        setTimeout(
            function(){
                if (socket.readyState === 1){
                    console.log('connection is secure')
                    if (callback != null) {
                        callback()
                    }
                    return;
                } else {
                    console.log('waiting for connection...');
                    recusion(callback);
                }
            }
        )
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;