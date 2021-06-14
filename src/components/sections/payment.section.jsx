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

const PaymentSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("syllabusListTab");
  const [myDetails, setMyDetails] = useState(
    props.userDetails.role !== "admin" ? props.userDetails : {}
  );
  const [oppDetails, setOppDetails] = useState(null);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [paymentPending, setPaymentPending] = useState([]);
  const [paymentUpcoming, setPaymentUpcoming] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [scheduleFormData, setScheduleFormData] = useState({
    requestAmount: balanceAmount,
    lastDate: new Date(),
    warningDate: new Date(),
    comment: "",
  });
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
    console.log(selectedDate, scheduleFormData);
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
    loadSchedules(
      teacher._id,
      teacher.role,
      student._id,
      student.studentMap._id
    );
    // clearScheduleFormData();
  };
  const handleUserSelect = (user) => {
    setOppDetails(user);
    loadSchedules(myDetails._id, myDetails.role, user._id, user.studentMap._id);
    // clearScheduleFormData();
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
        setScheduleFormData({
          ...scheduleFormData,
          requestAmount: response.data.balanceAmount,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAddNewShedule = (e) => {
    e.preventDefault();

    const studentMapID = oppDetails.studentMap._id;
    const userID = myDetails._id;
    const userRole = myDetails.role;
    const requestAmount = scheduleFormData.requestAmount;
    const comment = scheduleFormData.comment;
    const warningDate = scheduleFormData.warningDate;
    const lastDate = scheduleFormData.lastDate;
    console.log(requestAmount, studentMapID, userID, warningDate, lastDate);
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
        })
        .then((response) => {
          toast.success("Added successfully");

          loadSchedules(
            myDetails._id,
            myDetails.role,
            oppDetails._id,
            oppDetails.studentMap._id
          );
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
          compareDate(el.warningDate, new Date()) ===
            compareResult.date_2_is_bigger
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
    setPaymentHistory(schedules.filter((el) => el.isPaid === true));
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
          />
        );
      case "historyTab":
        return (
          <PaymentHistoryTab
            paymentContent={props.paymentContent}
            bindHistory={bindHistory}
          />
        );
      case "upcomingTab":
        return (
          <PaymentUpcomingTab
            paymentContent={props.paymentContent}
            bindUpcoming={bindUpcoming}
          />
        );
      case "scheduleTab":
        return (
          <PaymentScheduleTab
            paymentContent={props.paymentContent}
            bindSchedule={bindSchedule}
            bindScheduleAdd={bindScheduleAdd}
          />
        );

      default:
        return null;
    }
  };
  return (
    <section className="payment-section container">
      <div className="navbar-spacer"></div>
      {props.userDetails.role === "admin" ? (
        <TeacherStudentSelectorBlock
          myId={props.userDetails._id}
          myRole={props.userDetails.role}
          handleUserSelect={handleTeacherStudentSelect}
          autoLoad={true}
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
