import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CourseAllocationItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [classUrl, setClassUrl] = useState(props.studentmap.classLink);
  const [formData, setFormData] = useState({
    courseName: props.studentmap.courseName,
    feesAmount: props.studentmap.feesAmount,
    feesCurrency: props.studentmap.feesCurrency,
    paidAmount: props.studentmap.paidAmount,
  });
  const onChangeClassLink = (e) => {
    setClassUrl(e.target.value);
  };

  const handleFormdataChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleToggleEditMode = () => {
    if (editMode) {
      setClassUrl(props.studentmap.classLink);
      setFormData({
        courseName: props.studentmap.courseName,
        feesAmount: props.studentmap.feesAmount,
        feesCurrency: props.studentmap.feesCurrency,
        paidAmount: props.studentmap.paidAmount,
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
            props.studentmap._id,
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
      toast.error("please fill all fields");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (classUrl || true) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
            props.studentmap._id,
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
    <li>
      <div>{props.studentmap.studentName}</div>
      <div>{props.studentmap.teacherName}</div>
      <div className="no-need-in-test">
        <div>{props.studentmap.courseName}</div>
        <div>
          {props.studentmap.feesAmount}
          <span>{props.studentmap.feesCurrency}</span>
        </div>
        <div>{props.studentmap.paidAmount}</div>
      </div>
      <div className="for-test">
        <div className="form-group container">
          <input
            type="text"
            className="form-control"
            name="inputCourse"
            id="inputCourse"
            aria-describedby="helpId"
            placeholder="Course Name"
            readOnly={!editMode}
            onChange={handleFormdataChange("courseName")}
            value={formData.courseName}
          />
        </div>
        <div className="form-group container ">
          <label htmlFor="inputCourse">Fee</label>
          <input
            type="text"
            className="form-control  container"
            name="inputFee"
            id="inputFee"
            aria-describedby="helpId"
            placeholder="Fee"
            readOnly={!editMode}
            onChange={handleFormdataChange("feesAmount")}
            value={formData.feesAmount}
          />
        </div>
        <div className="form-group container ">
          <input
            type="text"
            className="form-control "
            name="inputCurrency"
            id="inputCurrency"
            aria-describedby="helpId"
            placeholder="Currency"
            readOnly={!editMode}
            onChange={handleFormdataChange("feesCurrency")}
            value={formData.feesCurrency}
          />
        </div>

        <div className="form-group container ">
          <label htmlFor="inputCourse">Paid Ammount</label>
          <input
            type="text"
            className="form-control  container"
            name="inputPaid"
            id="inputPaid"
            aria-describedby="helpId"
            placeholder="Paid Ammount"
            readOnly={!editMode}
            onChange={handleFormdataChange("paidAmount")}
            value={formData.paidAmount}
          />
        </div>
      </div>
      <div className="form-group container ">
        <label htmlFor="inputClassLink">Class Link</label>{" "}
        <textarea
          rows={1}
          id="inputClassLink"
          className="m-1 border rounded-5  container"
          value={classUrl}
          readOnly={!editMode}
          onChange={onChangeClassLink}
        ></textarea>
      </div>
      {editMode ? (
        <button onClick={handleSubmitForTest}>
          {props.manageContent.saveContent}
        </button>
      ) : (
        <button onClick={() => props.deleteMap(props.studentmap._id)}>
          {props.manageContent.deleteContent}
        </button>
      )}
      <button onClick={handleToggleEditMode}>
        {editMode
          ? props.manageContent.cancelContent
          : props.manageContent.editContent}
      </button>
    </li>
  );
};

export default CourseAllocationItem;
