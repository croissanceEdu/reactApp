import {
  Cancel,
  CancelOutlined,
  CancelPresentation,
  ControlPointDuplicate,
  CopyrightOutlined,
  Edit,
  Link,
  Save,
} from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";

import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import UserSelectorItem from "./user-selector.item";

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
    <li className="join-class-item container">
      <div className="top-block">
        <div className="avatar-name">
          <div className="user-avatar">
            <div
              className="avatar-img"
              style={{
                backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/${
                  props.classlink.oppDetails.imagePath
                    ? props.classlink.oppDetails.imagePath
                    : process.env.REACT_APP_DEFAULT_PROFILE_PIC
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "100%",
                width: "100%",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <div className="name-course-block">
            <h3>{props.classlink.oppDetails.name}</h3>
            {props.classlink.courseName ? (
              <p>{props.classlink.courseName}</p>
            ) : null}
          </div>
        </div>
      </div>
      <div className="textarea-block">
        <textarea
          rows={1}
          id={props.classlink._id}
          className="m-1 border rounded-5  container"
          value={classUrl}
          readOnly={!editMode}
          onChange={onChangeClassLink}
        ></textarea>
        {classUrl ? (
          <div className="copy-goto-buttons-block">
            <button onClick={handleopyLink}>
              {props.joinClassContent.copyContent}
            </button>
            <button onClick={handleGoto}>
              {props.joinClassContent.gotoContent}
            </button>
          </div>
        ) : (
          <div>No classes available now</div>
        )}
      </div>
      {isAuth().role === "teacher" && editMode ? (
        <button onClick={handleSubmit} className="save-button">
          {/* {props.joinClassContent.saveContent} */}
          <Save />
        </button>
      ) : null}
      {isAuth().role === "teacher" ? (
        <button
          onClick={handleToggleEditMode}
          className={editMode ? "back-button" : "edit-button"}
        >
          {/* {editMode ? props.joinClassContent.cancelContent: props.joinClassContent.editContent} */}
          {editMode ? <Cancel /> : <Edit />}
        </button>
      ) : null}
    </li>
  );
};

export default JoinClassItem;
