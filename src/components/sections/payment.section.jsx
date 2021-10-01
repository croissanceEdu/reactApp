// import Razorpay from require("razorpay");

import { useState } from "react";
import TabSelectorBlock from "../blocks/tab-selector.block";
import TeacherStudentSelectorBlock from "../blocks/teacher-student-selector.block";
import UserSelectorBlock from "../blocks/user-selector.block";
import PaymentScheduleItem from "../items/payment-schedule.item";
import PaymentScheduleAddItem from "../items/payment-schedule-add.item";
import PaymentPendingTab from "../tabs/payment-pending.tab";
import PaymentScheduleTab from "../tabs/payment-schedule.tab";
import { v4 as uuidv4 } from "uuid";
import PaymentPendingItem from "../items/payment-pending.item";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentHistoryItem from "../items/payment-history.item";
import PaymentHistoryTab from "../tabs/payment-history.tab";
import PaymentUpcomingTab from "../tabs/payment-upcoming.tab";
import { compareDate, compareResult } from "../../helpers/custom";
import PaymentRequestTab from "../tabs/payment-request.tab";
import PaymentRequestItem from "../items/payment-request.item";
import { manageWebSocketPayment } from "../../helpers/websocket-helper";

const PaymentSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("pendingTab");
  const [myDetails, setMyDetails] = useState(
    props.userDetails.role !== "admin" ? props.userDetails : {}
  );
  const [oppDetails, setOppDetails] = useState(null);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [paymentPending, setPaymentPending] = useState([]);
  const [paymentUpcoming, setPaymentUpcoming] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [feeDetails, setFeeDetails] = useState({
    feeAmount: 0,
    paidAmount: 0,
    editFeeMode: false,
  });
  const [scheduleFormData, setScheduleFormData] = useState({
    requestAmount: balanceAmount,
    lastDate: new Date(),
    warningDate: new Date(),
    comment: "",
  });
  const [recordPaymentFormData, setRecordPaymentFormData] = useState({
    paymentMethod: "",
    comment: "",
  });
  const formatMoney = (amount, currency) => {
    try {
      return Intl.NumberFormat(props.language, {
        style: "currency",
        currency: currency,
      }).format(amount);
    } catch {
      return `${amount} ${currency}`;
    }
  };
  const handleScheduleFormChange = (text) => (e) => {
    setScheduleFormData({ ...scheduleFormData, [text]: e.target.value });
  };
  const handleScheduleFormAmountChange = (text) => (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value < 0)
        setScheduleFormData({ ...scheduleFormData, [text]: 0 });
      else if (e.target.value > balanceAmount)
        setScheduleFormData({
          ...scheduleFormData,
          [text]: balanceAmount,
        });
      else {
        if (e.target.value.includes("."))
          setScheduleFormData({ ...scheduleFormData, [text]: e.target.value });
        else
          setScheduleFormData({
            ...scheduleFormData,
            [text]: Number(e.target.value),
          });
      }
    }
  };
  const handleScheduleFormAmountBlur = (text) => (e) => {
    setScheduleFormData({
      ...scheduleFormData,
      [text]: Number(e.target.value),
    });
  };
  const handleScheduleFormDateChange = (text, selectedDate) => {
    setScheduleFormData({ ...scheduleFormData, [text]: selectedDate });
  };
  const clearScheduleFormData = () => {
    setScheduleFormData({
      ...scheduleFormData,
      requestAmount: balanceAmount,
      lastDate: new Date(),
      warningDate: new Date(),
      comment: "",
    });
  };
  const handleTeacherStudentSelect = (teacher, student) => {
    setMyDetails(teacher);
    setOppDetails(student);

    loadTablesOnUserSelect(
      teacher._id,
      teacher.role,
      student._id,
      student.studentMap._id
    );

    // clearScheduleFormData();
  };
  const handleUserSelect = (user) => {
    setOppDetails(user);
    loadTablesOnUserSelect(
      myDetails._id,
      myDetails.role,
      user._id,
      user.studentMap._id
    );
    // clearScheduleFormData();
  };
  const confirmDeleteSchedule = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/payment/schedule/` + id)
      .then((response) => {
        toast.success(response.data.message);
        loadTables();
        manageWebSocketPayment(myDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    loadTables();
  };
  const generateRecordPayment = (paymentSchedule) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/addrecord/`, {
        userId: props.userDetails._id,
        userRole: props.userDetails.role,
        myId: myDetails._id,
        myRole: myDetails.role,
        oppId: oppDetails._id,
        paymentSchedule,
        comment: "test",
        paymentMethod: "record-payment",
        shiftId: props.userShiftId,
      })
      .then((response) => {
        toast.success(response.data.message);
        loadTables();
        manageWebSocketPayment(myDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    loadTables();
  };

  const razorpayPaymentSucess = (paymentSchedule, data) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/razorpaysuccess/`, {
        data,
        userId: props.userDetails._id,
        userRole: props.userDetails.role,
        myId: myDetails._id,
        myRole: myDetails.role,
        oppId: oppDetails._id,
        paymentSchedule,
        comment: "Razorpay",
        paymentMethod: "Razorpay",
        shiftId: props.userShiftId,
      })
      .then((response) => {
        toast.success(response.data.message);
        loadTables();
        manageWebSocketPayment(myDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    loadTables();
  };
  const approveRecordPayment = (paymentRequest) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/approverecord/`, {
        userId: props.userDetails._id,
        userRole: props.userDetails.role,
        myId: myDetails._id,
        myRole: myDetails.role,
        oppId: oppDetails._id,
        paymentRequest,
      })
      .then((response) => {
        toast.success(response.data.message);
        loadTables();
        manageWebSocketPayment(myDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    loadTables();
  };
  const rejectRecordPayment = (paymentRequest) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/rejectrecord/`, {
        userId: props.userDetails._id,
        userRole: props.userDetails.role,
        myId: myDetails._id,
        myRole: myDetails.role,
        oppId: oppDetails._id,
        paymentRequest,
      })
      .then((response) => {
        toast.success(response.data.message);
        loadTables();
        manageWebSocketPayment(myDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    loadTables();
  };
  const deleteSchedule = (id) => {
    props.popupFunctions.showWarningPopup(
      props.paymentContent.popups.deleteSchedule.tiltleContent,
      props.paymentContent.popups.deleteSchedule.descriptionContent,
      "delete-popup",
      [
        {
          content: props.paymentContent.popups.deleteSchedule.confirmContent,
          className: "btn delete-button",
          closeAfter: true,
          onClickFunction: confirmDeleteSchedule,
          onClickArgument: id,
        },
        {
          content: props.paymentContent.popups.deleteSchedule.cancelContent,
          className: "btn cancel-button",
          closeAfter: true,
        },
      ]
    );
  };

  const recordPaymentPopupOpen = (paymentSchedule) => {
    props.popupFunctions.showRecordPaymentPopup(
      props.paymentContent.popups.recordPayment.tiltleContent,
      props.paymentContent.popups.recordPayment.descriptionContent +
        formatMoney(paymentSchedule.requestAmount, paymentSchedule.currency),
      "payment-popup",
      [
        {
          content: props.paymentContent.popups.recordPayment.confirmContent,
          className: "btn edit-button",
          closeAfter: true,
          onClickFunction: generateRecordPayment,
          onClickArgument: paymentSchedule,
        },

        {
          content: props.paymentContent.popups.recordPayment.cancelContent,
          className: "btn cancel-button",
          closeAfter: true,
        },
      ],
      { comment: props.popupFunctions.getPopupData().comment }
    );
    console.log(props.popupFunctions.getPopupData());
  };

  const approvePaymentPopupOpen = (paymentRequest) => {
    props.popupFunctions.showApprovePaymentRequestPopup(
      props.paymentContent.popups.approvePayment.tiltleContent,
      props.paymentContent.popups.approvePayment.descriptionContent +
        formatMoney(paymentRequest.paidAmount, paymentRequest.currency),
      "payment-popup",
      [
        {
          content: props.paymentContent.popups.approvePayment.confirmContent,
          className: "btn save-button",
          closeAfter: true,
          onClickFunction: approveRecordPayment,
          onClickArgument: paymentRequest,
        },

        {
          content: props.paymentContent.popups.approvePayment.cancelContent,
          className: "btn cancel-button",
          closeAfter: true,
        },
      ],
      {}
    );
  };

  const rejectPaymentPopupOpen = (paymentRequest) => {
    props.popupFunctions.showApprovePaymentRequestPopup(
      props.paymentContent.popups.rejectPayment.tiltleContent,
      props.paymentContent.popups.rejectPayment.descriptionContent +
        formatMoney(paymentRequest.paidAmount, paymentRequest.currency),

      "payment-reject-popup",
      [
        {
          content: props.paymentContent.popups.rejectPayment.confirmContent,
          className: "btn delete-button",
          closeAfter: true,
          onClickFunction: rejectRecordPayment,
          onClickArgument: paymentRequest,
        },
        {
          content: props.paymentContent.popups.rejectPayment.cancelContent,
          className: "btn cancel-button",
          closeAfter: true,
        },
      ],
      {}
    );
  };

  const handlePayButtonClick = (paymentSchedule) => {
    props.popupFunctions.showWarningPopup(
      props.paymentContent.popups.payButtonClick.tiltleContent,
      props.paymentContent.popups.payButtonClick.descriptionContent,
      "payment-popup",
      [
        {
          content: props.paymentContent.popups.payButtonClick.confirmContent,
          className: "btn edit-button",
          closeAfter: false,
          onClickFunction: recordPaymentPopupOpen,
          onClickArgument: paymentSchedule,
        },
        {
          content: props.paymentContent.popups.payButtonClick.cancelContent,
          className: "btn cancel-button",
          closeAfter: true,
        },
      ]
    );
  };

  const bindScheduleAdd = () => {
    if (balanceAmount > 0)
      return (
        <PaymentScheduleAddItem
          balanceAmount={balanceAmount}
          handleAddNewShedule={handleAddNewShedule}
          paymentContent={props.paymentContent}
          handleScheduleFormChange={handleScheduleFormChange}
          handleScheduleFormAmountChange={handleScheduleFormAmountChange}
          handleScheduleFormAmountBlur={handleScheduleFormAmountBlur}
          scheduleFormData={scheduleFormData}
          handleScheduleFormDateChange={handleScheduleFormDateChange}
          currency={oppDetails.studentMap.feesCurrency}
        />
      );
  };

  const loadTables = () => {
    if (myDetails) {
      loadSchedules(
        myDetails._id,
        myDetails.role,
        oppDetails._id,
        oppDetails.studentMap._id
      );
      loadHistory(
        myDetails._id,
        myDetails.role,
        oppDetails._id,
        oppDetails.studentMap._id
      );
      loadRequests(
        myDetails._id,
        myDetails.role,
        oppDetails._id,
        oppDetails.studentMap._id
      );
    }
  };
  const loadTablesOnUserSelect = (myId, myRole, oppoId, mapId) => {
    loadSchedules(myId, myRole, oppoId, mapId);
    loadHistory(myId, myRole, oppoId, mapId);
    loadRequests(myId, myRole, oppoId, mapId);
  };

  const updateTables = () => {
    if (props.hasPaymentUpdate) {
      loadTables();
      props.setHasPaymentUpdate(false);
    }
  };
  const loadSchedules = (myId, myRole, oppoId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/getshedules`, {
        myId,
        myRole,
        oppoId,
        mapId,
      })
      .then((response) => {
        setTables(response.data.paymentSchedule);
        setBalanceAmount(response.data.balanceAmount);
        setFeeDetails({
          ...feeDetails,
          feeAmount: response.data.feeAmount,
          paidAmount: response.data.paidAmount,
        });
        setScheduleFormData({
          ...scheduleFormData,
          requestAmount: response.data.balanceAmount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadHistory = (myId, myRole, oppoId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/gethistory`, {
        myId,
        myRole,
        oppoId,
        mapId,
      })
      .then((response) => {
        setPaymentHistory(response.data.feePayment);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadRequests = (myId, myRole, oppoId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/getrequest`, {
        myId,
        myRole,
        oppoId,
        mapId,
      })
      .then((response) => {
        setPaymentRequests(response.data.feePaymentRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddNewShedule = (e) => {
    e.preventDefault();

    const studentMapID = oppDetails.studentMap._id;
    const userID = props.userDetails._id;
    const userRole = props.userDetails.role;
    const requestAmount = scheduleFormData.requestAmount;
    const currency = oppDetails.studentMap.feesCurrency;
    const comment = scheduleFormData.comment;
    const warningDate = scheduleFormData.warningDate;
    const lastDate = scheduleFormData.lastDate;

    if (requestAmount && studentMapID && userID && warningDate && lastDate) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/payment/addschedule`, {
          studentMapID,
          userID,
          userRole,
          requestAmount,
          comment,
          warningDate,
          lastDate,
          currency,
        })
        .then((response) => {
          toast.success("Added successfully");
          loadTables();
          manageWebSocketPayment(myDetails);

          // clearScheduleFormData();
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  const setTables = (schedules) => {
    setPaymentSchedule(schedules);
    setPaymentPending(
      schedules.filter(
        (el) =>
          el.isPaid === false &&
          (compareDate(el.warningDate, new Date()) ===
            compareResult.date_2_is_bigger ||
            compareDate(el.warningDate, new Date()) === compareResult.sameDay)
      )
    );
    setPaymentUpcoming(
      schedules.filter(
        (el) =>
          el.isPaid === false &&
          compareDate(el.warningDate, new Date()) ===
            compareResult.date_1_is_bigger
      )
    );
  };

  const bindFeeDetails = () => {
    if (oppDetails)
      return (
        <div className="fee-details">
          <div className="form-group-fee row  container">
            <label>{props.paymentContent.totalContent}</label>
            <div>
              {formatMoney(
                feeDetails.feeAmount,
                oppDetails.studentMap.feesCurrency
              )}
            </div>
          </div>
          <div className="form-group-fee row container">
            <label>{props.paymentContent.paidContent}</label>
            <div>
              {formatMoney(
                feeDetails.paidAmount,
                oppDetails.studentMap.feesCurrency
              )}
            </div>
          </div>
          <div className="form-group-fee row container">
            <label>{props.paymentContent.balanceContent}</label>
            <div>
              {formatMoney(
                feeDetails.feeAmount - feeDetails.paidAmount,
                oppDetails.studentMap.feesCurrency
              )}
            </div>
          </div>
        </div>
      );
    else return null;
  };
  const bindPending = () => {
    if (!paymentPending.length) return <p className="empty-p">Empty</p>;
    return paymentPending.map((item) => {
      return (
        <PaymentPendingItem
          payment={item}
          key={uuidv4()}
          paymentContent={props.paymentContent}
          currency={oppDetails.studentMap.feesCurrency}
          userDetails={props.userDetails}
          handlePayButtonClick={handlePayButtonClick}
          recordPaymentPopupOpen={recordPaymentPopupOpen}
          razorpayPaymentSucess={razorpayPaymentSucess}
          formatMoney={formatMoney}
        />
      );
    });
  };
  const bindUpcoming = () => {
    if (!paymentUpcoming.length) return <p className="empty-p">Empty</p>;
    return paymentUpcoming.map((item) => {
      return (
        <PaymentPendingItem
          payment={item}
          key={uuidv4()}
          paymentContent={props.paymentContent}
          currency={oppDetails.studentMap.feesCurrency}
          userDetails={props.userDetails}
          handlePayButtonClick={handlePayButtonClick}
          recordPaymentPopupOpen={recordPaymentPopupOpen}
          razorpayPaymentSucess={razorpayPaymentSucess}
          formatMoney={formatMoney}
        />
      );
    });
  };
  const bindHistory = () => {
    if (!paymentHistory.length) return <p className="empty-p">Empty</p>;
    return paymentHistory.map((item) => {
      return (
        <PaymentHistoryItem
          payment={item}
          key={uuidv4()}
          paymentContent={props.paymentContent}
          currency={oppDetails.studentMap.feesCurrency}
          formatMoney={formatMoney}
        />
      );
    });
  };

  const bindRequests = () => {
    if (!paymentRequests.length) return <p className="empty-p">Empty</p>;
    return paymentRequests.map((item) => {
      return (
        <PaymentRequestItem
          payment={item}
          key={uuidv4()}
          paymentContent={props.paymentContent}
          currency={oppDetails.studentMap.feesCurrency}
          userDetails={props.userDetails}
          approvePaymentPopupOpen={approvePaymentPopupOpen}
          rejectPaymentPopupOpen={rejectPaymentPopupOpen}
          formatMoney={formatMoney}
        />
      );
    });
  };
  const bindSchedule = () => {
    if (!paymentSchedule.length) return <p className="empty-p">Empty</p>;
    return paymentSchedule.map((item) => {
      return (
        <PaymentScheduleItem
          payment={item}
          key={uuidv4()}
          paymentContent={props.paymentContent}
          currency={oppDetails.studentMap.feesCurrency}
          deleteSchedule={deleteSchedule}
          userDetails={props.userDetails}
          formatMoney={formatMoney}
        />
      );
    });
  };

  const bindTabWindow = () => {
    switch (selectedTab) {
      case "pendingTab":
        return (
          <PaymentPendingTab
            paymentContent={props.paymentContent}
            bindPending={bindPending}
            bindFeeDetails={bindFeeDetails}
          />
        );
      case "historyTab":
        return (
          <PaymentHistoryTab
            paymentContent={props.paymentContent}
            bindHistory={bindHistory}
            bindFeeDetails={bindFeeDetails}
          />
        );
      case "upcomingTab":
        return (
          <PaymentUpcomingTab
            paymentContent={props.paymentContent}
            bindUpcoming={bindUpcoming}
            bindFeeDetails={bindFeeDetails}
          />
        );
      case "scheduleTab":
        return (
          <PaymentScheduleTab
            paymentContent={props.paymentContent}
            bindSchedule={bindSchedule}
            bindScheduleAdd={bindScheduleAdd}
            userDetails={props.userDetails}
            bindFeeDetails={bindFeeDetails}
          />
        );
      case "requestTab":
        return (
          <PaymentRequestTab
            paymentContent={props.paymentContent}
            bindRequests={bindRequests}
            bindFeeDetails={bindFeeDetails}
          />
        );
      default:
        return null;
    }
  };
  updateTables();

  return (
    <section className="payment-section">
      <div className="navbar-spacer"></div>
      {props.userDetails.role === "admin" ? (
        <TeacherStudentSelectorBlock
          myId={props.userDetails._id}
          myRole={props.userDetails.role}
          handleUserSelect={handleTeacherStudentSelect}
          autoLoad={true}
          onlineUsers={props.onlineUsers}
        />
      ) : (
        <UserSelectorBlock
          myId={myDetails._id}
          myRole={myDetails.role}
          handleUserSelect={handleUserSelect}
          autoLoad={true}
          selectedPage={"paymentPage"}
          notifications={props.notifications}
          notify={props.notify}
          onlineUsers={props.onlineUsers}
        />
      )}
      <div className="tab-section">
        <TabSelectorBlock
          tabWindows={props.paymentContent.tabWindows}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isAvailable={oppDetails}
          unAvailableMessage="Select one from the list"
        />
        {bindTabWindow()}
      </div>
    </section>
  );
};

export default PaymentSection;
