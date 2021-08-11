import { io } from "socket.io-client";
// const io = require("socket.io-client");

const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);



export const userConnected = (user, callbackNotify, callbackSetOnlineUsers) => {
    socket.emit('new-user-login', user);

    socket.on('status-message', data => {
        // console.log(data)
        // console.log(data)
        callbackNotify();
    })
    socket.on('receive-notification', data => {
        // console.log(data)
        callbackNotify();
    })
    socket.emit('get-online-users', user);
    socket.on('online-users', data => {
        // console.log(data)
        callbackSetOnlineUsers(data);
    })
    socket.on('new-user-login', data => {
        // console.log('you connected')
        // console.log(data)
    })
    socket.on('user-disconnected', data => {
        // console.log("data")
    })

}

export const manageWebSocketGetOnlineUsers = (user, callbackFunction) => {
    socket.emit('get-online-users', user);
    socket.on('online-users', data => {
        // console.log(data)
        callbackFunction(data);
    })
}

export const manageWebSocketReceiveFeedback = (user, callbackNotify) => {
    socket.on('receive-feedback', data => {
        // console.log(data)
        callbackNotify();
    })
}


export const manageWebSocketSendNotification = (user) => {
    socket.emit('send-notification', user);

}



