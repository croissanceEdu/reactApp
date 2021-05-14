import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const UserSelectorByRoleBlock = (props) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
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
  };
  const bindUsers = () => {
    return userOptions.map((item) => {
      let itemClassName = "";
      if (selectedUser._id === item._id) {
        itemClassName = "text-danger";
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
  return <ul>{bindUsers()}</ul>;
};

export default UserSelectorByRoleBlock;
