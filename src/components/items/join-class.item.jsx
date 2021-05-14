import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";

const JoinClassItem = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [classUrl, setClassUrl] = useState(props.classlink.classLink);
  const handleopyLink = () => {
    var copyText = document.getElementById(props.classlink._id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // toast.success("Link copied");
    copyText.setSelectionRange(0, 0);
  };
  const handleGoto = () => {
    var url = classUrl;
    var win = window.open(url, "_blank");
    win.focus();
  };

  const handleToggleEditMode = () => {
    if (editMode) {
      setClassUrl(props.classlink.classLink);
    }
    setEditMode((prev) => !prev);
  };
  const onChangeClassLink = (e) => {
    setClassUrl(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (classUrl || true) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
            props.classlink._id,
          {
            classLink: classUrl,
          }
        )
        .then((response) => {
          props.loadClasses();
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <li>
      <h2>{props.classlink.oppDetails.name}</h2>

      {classUrl ? (
        <div>
          <button onClick={handleopyLink}>
            {props.joinClassContent.copyContent}
          </button>
          <button onClick={handleGoto}>
            {" "}
            {props.joinClassContent.gotoContent}
          </button>
        </div>
      ) : (
        <div>No classes available now</div>
      )}
      <textarea
        rows={1}
        id={props.classlink._id}
        className="m-1 border rounded-5  container"
        value={classUrl}
        readOnly={!editMode}
        onChange={onChangeClassLink}
      ></textarea>
      {isAuth().role === "teacher" && editMode ? (
        <button onClick={handleSubmit}>
          {props.joinClassContent.saveContent}
        </button>
      ) : null}
      {isAuth().role === "teacher" ? (
        <button onClick={handleToggleEditMode}>
          {editMode
            ? props.joinClassContent.cancelContent
            : props.joinClassContent.editContent}
        </button>
      ) : null}
    </li>
  );
};

export default JoinClassItem;
