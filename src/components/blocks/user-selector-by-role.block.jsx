import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { customContent } from "../../helpers/custom";

const UserSelectorByRoleBlock = (props) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
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
  const loadUsers = (role) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
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
        setSelectorTitle(customContent.userSelector.selectTeacherContent);
        break;
      case "student":
        setSelectorTitle(customContent.userSelector.selectStudentContent);
        break;
      default:
        setSelectorTitle(customContent.userSelector.selectUserContent);
        break;
    }
  };
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      item.notificationCount = 0;
      let itemClassName = "non-selected";
      if (selectedUser._id === item._id) {
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
    if (props.autoLoad) loadUsers(props.userRole);
  }, [props.autoLoad]);
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

export default UserSelectorByRoleBlock;
