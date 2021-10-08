import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import TeacherStudentSelectorItem from "../items/teacher-student-selector.item";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import { manageWebSocketGetOnlineUsers } from "../../helpers/websocket-helper";
import { customContent } from "../../helpers/custom";

const TeacherStudentSelectorBlock = (props, ref) => {
  const [userOptions, setUserOptions] = useState([]);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectorTitle, setSelectorTitle] = useState("");
  const [visibilityclass, setVisibilityclass] = useState("");

  const handleUserSelect = (user) => {
    if (visibilityclass === "") {
      setVisibilityclass("collapse-block");
      if (selectedUser !== user) {
        setSelectedUser(user);
        props.handleUserSelect(user.teacher, user.student);
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
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      let itemClassName = "non-selected";
      if (selectedUser._id === item._id) {
        itemClassName = "selected-user";
      }
      item.student.isOnline = props.onlineUsers.includes(item.student._id)
        ? true
        : false;
      item.teacher.isOnline = props.onlineUsers.includes(item.teacher._id)
        ? true
        : false;

      return (
        <TeacherStudentSelectorItem
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

export default TeacherStudentSelectorBlock;
