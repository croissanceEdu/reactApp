import { io } from "socket.io-client";
// const io = require("socket.io-client");

const socket = io(process.env.REACT_APP_SOCKET_SERVER_URL);



export const userConnected = (user, callbackNotify, callbackSetOnlineUsers, callbackHandleNewShift, callbackPaymentUpdate, callbackFeedbackUpdate) => {
    socket.emit('new-user-login', user);

    socket.on('new-shift', data => {
        callbackHandleNewShift(data)
        callbackNotify();
    })
    socket.on('status-message', data => {
        // console.log(data)
        callbackNotify();
    })
    socket.on('receive-notification', data => {
        callbackNotify();
        callbackFeedbackUpdate();
    })
    socket.on('update-payment', data => {
        callbackPaymentUpdate();
    })
    socket.on('update-feedback', data => {
        if (data.user.conectedUsers.includes(user._id))
            callbackFeedbackUpdate();
    })

    socket.emit('get-online-users', user);
    socket.on('online-users', data => {
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

export const manageWebSocketPayment = (user) => {
    socket.emit('payment-update', user);

}

export const manageWebSocketFeedback = (user) => {
    socket.emit('feedback-update', user);

}

