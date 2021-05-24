import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UserSelectorByRoleBlock = (props) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectorTitle, setSelectorTitle] = useState("");

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    props.handleUserSelect(user);
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
        setSelectorTitle("Teacher-Student");
        break;
      case "teacher":
        setSelectorTitle("Teachers");
        break;
      case "student":
        setSelectorTitle("Students");
        break;

      default:
        setSelectorTitle("Select User");
        break;
    }
  };
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      item.notificationCount = 0;
      let itemClassName = "";
      if (selectedUser._id === item._id) {
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
    if (props.autoLoad) loadUsers(props.userRole);
  }, [props.autoLoad]);
  return (
    <ul className="user-selector-block">
      <h5>{selectorTitle}</h5>
      {bindUsers()}
    </ul>
  );
};

export default UserSelectorByRoleBlock;
