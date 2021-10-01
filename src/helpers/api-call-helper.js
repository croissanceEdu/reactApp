// import { manageWebSocketFeedback } from "./websocket-helper";

const { default: axios } = require("axios");



export const loadNotifications = (_id, role, setNotifications, updateProfilePicture) => {
    axios
        .post(`${process.env.REACT_APP_SERVER_URL}/user/notify`, {
            _id,
            role,
        })
        .then((response) => {
            // console.log(response.data)
            setNotifications(response.data.notifications)
            updateProfilePicture(response.data.imagePath);
            // if (response.data.flags.hasFeedbackUpodate) {
            //     manageWebSocketFeedback({ _id, role })
            // }
        })
        .catch((error) => {
            console.log(error);
        });
};