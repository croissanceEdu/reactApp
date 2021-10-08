import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Refresh } from "@material-ui/icons";
import { customContent } from "../../helpers/custom";

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
  const handleRefreshClick = (user) => {
    if (props.handleRefresh) props.handleRefresh();
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
        setSelectorTitle(
          customContent.userSelector.selectTeacherStudentContent
        );
        break;
      case "teacher":
        setSelectorTitle(customContent.userSelector.selectStudentContent);
        break;
      case "student":
        setSelectorTitle(customContent.userSelector.selectTeacherContent);
        break;

      default:
        setSelectorTitle(customContent.userSelector.selectUserContent);
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
  const bindRefreshIcon = () => {
    if (
      getNotifications(
        selectedUser._id,
        selectedUser.studentMap._id,
        props.selectedPage
      ) > 0
    ) {
      return (
        <Refresh
          style={{ color: "#fff" }}
          className="refresh-icon"
          onClick={handleRefreshClick}
        />
      );
    } else return null;
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
      item.isOnline = props.onlineUsers.includes(item._id) ? true : false;
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
      {bindRefreshIcon()}
    </div>
  );
};

export default UserSelectorBlock;
