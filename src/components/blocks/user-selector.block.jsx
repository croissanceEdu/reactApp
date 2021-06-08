import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const UserSelectorBlock = (props, ref) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ studentMap: {} });
  const [selectorTitle, setSelectorTitle] = useState("");
  const [visibilityclass, setVisibilityclass] = useState("");

  const handleUserSelect = (user) => {
    if (visibilityclass === "") {
      setVisibilityclass("collapse-block");
      if (selectedUser !== user) {
        setSelectedUser(user);

        props.handleUserSelect(user);
      }
    }
  };
  const handleSelectorClick = (user) => {
    if (visibilityclass === "collapse-block") setVisibilityclass("");
  };
  const loadUsers = (role, _id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/getbyid`, {
        _id,
        role,
      })
      .then((response) => {
        setUserOptions(response.data.user);
      })
      .catch((error) => {
        toast(error);
      });
    switch (role) {
      case "admin":
        setSelectorTitle("--Select Teacher-Student--");
        break;
      case "teacher":
        setSelectorTitle("--Select Student--");
        break;
      case "student":
        setSelectorTitle("--SelectTeacher--");
        break;

      default:
        setSelectorTitle("--Select User--");
        break;
    }
  };
  const getNotifications = (id, mapId, selectedPage) => {
    switch (selectedPage) {
      case "feedbackPage":
        return props.notifications.feedback.filter(
          (el) => el.fromID === id && el.studentMapID === mapId
        ).length;
      case "syllabusPage":
        return props.notifications.syllabus.filter(
          (el) => el.teacherID === id && el.studentMapID === mapId
        ).length;
      default:
        return 0;
    }
  };
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      item.notificationCount = getNotifications(
        item._id,
        item.studentMap._id,
        props.selectedPage
      );
      let itemClassName = "non-selected";
      if (selectedUser.studentMap._id === item.studentMap._id) {
        itemClassName = "selected-user";
      }
      return (
        <UserSelectorItem
          key={uuidv4()}
          user={item}
          handleUserSelect={handleUserSelect}
          itemClassName={itemClassName}
        />
      );
    });
  };
  useEffect(() => {
    if (props.autoLoad) loadUsers(props.myRole, props.myId);
  }, [props.autoLoad, props.myRole, props.myId]);

  return (
    <div className={`user-selector-block ${visibilityclass}`}>
      <h5>{selectorTitle}</h5>
      <ul onClick={handleSelectorClick}>
        {bindUsers()}{" "}
        <ArrowDropDownIcon
          style={{ color: "#fff" }}
          className="dropdown-icon"
        />
      </ul>
    </div>
  );
};

export default UserSelectorBlock;
