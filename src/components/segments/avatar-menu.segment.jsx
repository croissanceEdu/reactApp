import { useState } from "react";
import { CameraAlt, DeleteForever, Edit } from "@material-ui/icons";

const AvatarMenuSegment = (props) => {
  const [open, setOpen] = useState(false);
  const [camClass, setCamClass] = useState("avatar-menu-button primary-button");
  const [editClass, setEditClass] = useState(
    "avatar-menu-button-hidden edit-button"
  );
  const [deleteClass, setDeleteClass] = useState(
    "avatar-menu-button-hidden delete-button"
  );

  const handleToggle = () => {
    if (!open) {
      setCamClass("avatar-menu-button-hidden primary-button");
      setEditClass("avatar-menu-button edit-button");
      setDeleteClass("avatar-menu-button delete-button");
      setOpen(true);
    } else {
      setCamClass("avatar-menu-button primary-button");
      setEditClass("avatar-menu-button-hidden edit-button");
      setDeleteClass("avatar-menu-button-hidden delete-button");
      setOpen(false);
    }
  };
  const handleClose = () => {
    setCamClass("avatar-menu-button primary-button");
    setEditClass("avatar-menu-button-hidden edit-button");
    setDeleteClass("avatar-menu-button-hidden delete-button");
    setOpen(false);
  };

  return (
    <div className="avatar-menu">
      <div>
        <button onClick={handleToggle} className={camClass}>
          <CameraAlt fontSize="large" />
        </button>
        <button
          onClick={() => {
            handleClose();
            props.handleCropper();
          }}
          className={editClass}
        >
          <Edit fontSize="large" />
        </button>
        <button
          onClick={() => {
            handleClose();
            props.handleRemoveImage();
          }}
          className={deleteClass}
          disabled={
            !props.profilePicture ||
            props.profilePicture ==
              `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`
              ? true
              : false
          }
        >
          <DeleteForever fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default AvatarMenuSegment;
