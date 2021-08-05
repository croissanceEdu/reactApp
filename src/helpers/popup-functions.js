//"use strict";

let popupFunctions = {
    showWarningPopup(title, content, className, buttons) {
        setPopupDetails({ title, content, popupType: "warning", className, buttons, popupData: {} });
        setPopupVisibility(true);
        setTimeout(() => {
            setPopupContainerClassNames("overlay-visible");
        }, 10);
    },
    showRecordPaymentPopup(title, content, className, buttons, popupData) {
        setPopupDetails({ title, content, popupType: "record-payment", className, buttons, popupData });
        setPopupVisibility(true);
        setTimeout(() => {
            setPopupContainerClassNames("overlay-visible");
        }, 10);
    },
    getPopupData() { return popupDetails; },
    setPopupData(popupData) { setPopupDetails({ ...popupDetails, popupData }) },
    closePopup() {
        setPopupContainerClassNames("closing");
        setTimeout(() => {
            setPopupContainerClassNames("");
            setPopupVisibility(false);
            setPopupDetails({ title: "", content: "", popupType: "", className: "", buttons: [], popupData: {} });
        }, 1000);
    },
}

module.exports = popupFunctions;