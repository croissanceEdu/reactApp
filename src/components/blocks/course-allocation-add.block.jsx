import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import UserSelectorByRoleBlock from "./user-selector-by-role.block";

const CourseAllocationAddBlock = (props) => {
  const [classUrl, setClassUrl] = useState("");
  const [teacherDetails, setTeacherDetails] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const [formData, setFormData] = useState({
    courseName: "",
    feesAmount: 0,
    feesCurrency: "INR",
    paidAmount: 0,
  });
  const handleTeacherSelect = (user) => {
    setTeacherDetails(user);
  };
  const handleStudentSelect = (user) => {
    setStudentDetails(user);
  };
  const handleClassLinkChange = (e) => {
    setClassUrl(e.target.value);
  };

  const handleFormdataChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleFormdataNumberChange = (text) => (e) => {
    if (!isNaN(Number(e.target.value))) {
      if (e.target.value.includes("."))
        setFormData({ ...formData, [text]: e.target.value });
      else setFormData({ ...formData, [text]: Number(e.target.value) });
    }
  };
  const handleScheduleFormAmountBlur = (text) => (e) => {
    setFormData({
      ...formData,
      [text]: Number(e.target.value),
    });
  };

  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentDetails._id && teacherDetails._id) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/add`, {
          studentID: studentDetails._id,
          teacherID: teacherDetails._id,
          classLink: classUrl,
          courseName: formData.courseName,
          feesAmount: formData.feesAmount,
          feesCurrency: formData.feesCurrency,
          paidAmount: formData.paidAmount,
        })
        .then((response) => {
          toast.success(response.data.message);
          setClassUrl("");
          props.loadStudentMap();
          props.setSelectedTab("allocateTab");
        });
    } else {
      toast.error(props.manageContent.alertMessages.fillAllFieldContent);
    }
  };
  return (
    <form
      onSubmit={(formProps) => {
        handleSubmit(formProps);
      }}
    >
      <div className="teacher-student">
        <UserSelectorByRoleBlock
          userRole="teacher"
          autoLoad={true}
          handleUserSelect={handleTeacherSelect}
          onlineUsers={props.onlineUsers}
        />

        <UserSelectorByRoleBlock
          userRole="student"
          autoLoad={true}
          handleUserSelect={handleStudentSelect}
          onlineUsers={props.onlineUsers}
        />
      </div>
      <div className="form-group container">
        <label htmlFor="inputCourse">
          {props.manageContent.courseNameContent}
        </label>
        <input
          type="text"
          className="form-control"
          name="inputCourse"
          id="inputCourse"
          aria-describedby="helpId"
          placeholder={props.manageContent.courseNameContent}
          required
          onChange={handleFormdataChange("courseName")}
          value={formData.courseName}
        />
      </div>
      <div className="form-group container ">
        <label htmlFor="inputFee">{props.manageContent.feeContent}</label>
        <input
          type="text"
          className="form-control  container"
          name="inputFee"
          id="inputFee"
          aria-describedby="helpId"
          placeholder={props.manageContent.feeContent}
          required
          onChange={handleFormdataNumberChange("feesAmount")}
          onBlur={handleScheduleFormAmountBlur("feesAmount")}
          value={formData.feesAmount}
        />
      </div>
      <div className="form-group container ">
        <label htmlFor="inputCurrency">
          {props.manageContent.currencyContent}
        </label>
        <select
          placeholder="Currency"
          className="form-control "
          name="inputCurrency"
          id="inputCurrency"
          required
          onChange={handleFormdataChange("feesCurrency")}
          value={formData.feesCurrency}
        >
          {props.bindCurrencies()}
        </select>
      </div>

      {/* <div className="form-group container ">
        <label htmlFor="inputPaid">{props.manageContent.paidAmountContent}</label>
        <input
          type="text"
          className="form-control  container"
          name="inputPaid"
          id="inputPaid"
          aria-describedby="helpId"
          placeholder={props.manageContent.paidAmountContent}
          required
          onChange={handleFormdataNumberChange("paidAmount")}
          onBlur={handleScheduleFormAmountBlur("paidAmount")}
          value={formData.paidAmount}
        />
      </div> */}

      <div className="form-group container">
        <label htmlFor="classLink">
          {props.manageContent.classLinkContent}
        </label>
        <textarea
          placeholder={props.manageContent.classLinkContent}
          className="form-control "
          name="classLink"
          id="classLink"
          rows="3"
          onChange={handleClassLinkChange}
          value={classUrl}
        ></textarea>
      </div>
      <div className="form-group  container text-center justify-content-center">
        <button type="submit" className="btn save-button">
          {props.manageContent.saveContent}
        </button>
      </div>
    </form>
  );
};
export default CourseAllocationAddBlock;
