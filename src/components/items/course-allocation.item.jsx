import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const CourseAllocationItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [classUrl, setClassUrl] = useState(props.studentmap.classLink);

  const onChangeClassLink = (e) => {
    setClassUrl(e.target.value);
  };
  const handleToggleEditMode = () => {
    if (editMode) {
      setClassUrl(props.studentmap.classLink);
    }
    setEditMode((prev) => !prev);
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
      {" "}
      <div>{props.studentmap.studentName}</div>
      <div>{props.studentmap.teacherName}</div>
      <textarea
        rows={1}
        id={props.studentmap._id}
        className="m-1 border rounded-5  container"
        value={classUrl}
        readOnly={!editMode}
        onChange={onChangeClassLink}
      ></textarea>
      {editMode ? (
        <button onClick={handleSubmit}>
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
