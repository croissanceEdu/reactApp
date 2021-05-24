import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UserSelectorBlock = (props, ref) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ studentMap: {} });
  const [selectorTitle, setSelectorTitle] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    props.handleUserSelect(user);
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
        setSelectorTitle("Teacher-Student");
        break;
      case "teacher":
        setSelectorTitle("Students");
        break;
      case "student":
        setSelectorTitle("Teachers");
        break;

      default:
        setSelectorTitle("Select User");
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
      let itemClassName = "";
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
    <ul className="user-selector-block">
      <h5>{selectorTitle}</h5>
      {bindUsers()}
    </ul>
  );
};

export default UserSelectorBlock;
