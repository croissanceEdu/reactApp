import { Backdrop } from "@material-ui/core";
import { ArrowBack, ArrowLeft, TimerOutlined } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import UserAvatarBlock from "../blocks/user-avatar-block";
import UserSelectorItem from "./user-selector.item";

const CourseAllocationItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [classUrl, setClassUrl] = useState(props.studentMap.classLink);
  const [formData, setFormData] = useState({
    courseName: props.studentMap.courseName,
    feesAmount: props.studentMap.feesAmount,
    feesCurrency: props.studentMap.feesCurrency,
    paidAmount: props.studentMap.paidAmount,
  });
  const onChangeClassLink = (e) => {
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
  const handleToggleEditMode = () => {
    if (editMode) {
      setClassUrl(props.studentMap.classLink);
      setFormData({
        courseName: props.studentMap.courseName,
        feesAmount: props.studentMap.feesAmount,
        feesCurrency: props.studentMap.feesCurrency,
        paidAmount: props.studentMap.paidAmount,
      });
    }
    setEditMode((prev) => !prev);
  };

  const handleSubmitForTest = (e) => {
    e.preventDefault();
    if (classUrl || true) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
            props.studentMap._id,
          {
            classLink: classUrl,
            courseName: formData.courseName,
            feesAmount: formData.feesAmount,
            feesCurrency: formData.feesCurrency,
            paidAmount: formData.paidAmount,
          }
        )
        .then((response) => {
          props.loadStudentMap();
        });
    } else {
      toast.error(props.manageContent.alertMessages.fillAllFieldContent);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (classUrl || true) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
            props.studentMap._id,
          {
            classLink: classUrl,
          }
        )
        .then((response) => {
          props.loadStudentMap();
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <li
      className={props.itemClassName}
      onClick={() => {
        props.handleAllocationSelect(props.studentMap);

        if (props.itemClassName !== "selected-allocation")
          setTimeout(() => {
            window.scrollTo({
              top: document.getElementById(props.studentMap._id).offsetTop,
            });
          }, 10);
      }}
      id={props.studentMap._id}
    >
      <div className="back-button-block text-right">
        <button
          className="btn back-button"
          onClick={() => {
            props.setVisibilityclass("");
            setTimeout(() => {
              window.scrollTo({
                top: document.getElementById(props.studentMap._id).offsetTop,
              });
              props.handleBackButtonClick(props.studentMap);
            }, 10);
          }}
        >
          <ArrowBack />
        </button>
      </div>
      <div className="teacher-student">
        <UserAvatarBlock user={props.studentMap.teacher} />
        <UserAvatarBlock user={props.studentMap.student} />
      </div>
      <p className="course-name">{props.studentMap.courseName}</p>
      <div className="no-need-in-test">
        <div>{props.studentMap.courseName}</div>
        <div>
          {props.studentMap.feesAmount}
          <span>{props.studentMap.feesCurrency}</span>
        </div>
        <div>{props.studentMap.paidAmount}</div>
      </div>
      <div className="for-test">
        <div className="form-group container">
          <label htmlFor="inputCourse">
            {props.manageContent.courseNameContent}
          </label>
          <input
            type="text"
            className="form-control"
            name="inputCourse"
            aria-describedby="helpId"
            placeholder={props.manageContent.courseNameContent}
            readOnly={!editMode}
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
            aria-describedby="helpId"
            placeholder={props.manageContent.feeContent}
            readOnly={!editMode}
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
            placeholder={props.manageContent.currencyContent}
            className="form-control "
            name="inputCurrency"
            aria-describedby="helpId"
            readOnly={!editMode}
            onChange={handleFormdataChange("feesCurrency")}
            value={formData.feesCurrency}
          >
            {props.bindCurrencies()}
          </select>
        </div>

        <div className="form-group container ">
          <label htmlFor="inputPaid">
            {props.manageContent.paidAmountContent}
          </label>
          <input
            type="text"
            className="form-control  container"
            name="inputPaid"
            aria-describedby="helpId"
            placeholder={props.manageContent.paidAmountContent}
            readOnly={true}
            onChange={handleFormdataNumberChange("paidAmount")}
            onBlur={handleScheduleFormAmountBlur("paidAmount")}
            value={formData.paidAmount}
          />
        </div>
      </div>
      <div className="form-group container ">
        <label htmlFor="inputClassLink">
          {props.manageContent.classLinkContent}
        </label>
        <textarea
          rows={1}
          id="inputClassLink"
          className="m-1 border rounded-5  container"
          value={classUrl}
          readOnly={!editMode}
          onChange={onChangeClassLink}
        ></textarea>
      </div>
      <div className="action-buttons">
        {editMode ? (
          <button onClick={handleSubmitForTest} className="save-button">
            {props.manageContent.saveContent}
          </button>
        ) : (
          <button
            onClick={() => {
              props.setVisibilityclass("");
              setTimeout(() => {
                window.scrollTo({
                  top: document.getElementById(props.studentMap._id).offsetTop,
                });
                props.deleteMap(props.studentMap._id);
              }, 10);
            }}
            className="delete-button"
          >
            {props.manageContent.deleteContent}
          </button>
        )}
        <button
          onClick={handleToggleEditMode}
          className={editMode ? "cancel-button" : "edit-button"}
        >
          {editMode
            ? props.manageContent.cancelContent
            : props.manageContent.editContent}
        </button>
      </div>
    </li>
  );
};

export default CourseAllocationItem;
