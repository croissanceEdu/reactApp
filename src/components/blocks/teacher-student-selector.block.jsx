import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import TeacherStudentSelectorItem from "../items/teacher-student-selector.item";

const TeacherStudentSelectorBlock = (props, ref) => {
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    props.handleUserSelect(user.teacher, user.student);
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
  };
  const bindUsers = () => {
    if (!userOptions.length) return <p className="empty-p">Empty</p>;
    return userOptions.map((item) => {
      let itemClassName = "";
      if (selectedUser._id === item._id) {
        itemClassName = "selected-user";
      }
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

  return <ul className="user-selector-block">{bindUsers()}</ul>;
};

export default TeacherStudentSelectorBlock;
