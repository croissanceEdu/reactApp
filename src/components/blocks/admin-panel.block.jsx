import axios from "axios";
import UserSelectorItem from "../items/user-selector.item";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AdminPanelBlock = (props) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState("");
  const handleUserSelect = (id) => {
    setSelectedUserID(id);
    props.handleUserSelect(id);
  };
  const loadUsers = (role) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
        role,
      })
      .then((response) => {
        console.log(response);
        setUserOptions(response.data.user);
      })
      .catch((error) => {
        toast(error);
      });
  };
  const bindUsers = () => {
    return userOptions.map((item) => {
      let itemClassName = "";
      if (selectedUserID === item._id) {
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
    loadUsers("teacher");
  }, []);
  return <ul>{bindUsers()}</ul>;
};

export default AdminPanelBlock;
