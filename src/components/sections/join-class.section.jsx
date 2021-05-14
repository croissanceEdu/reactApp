import { isAuth } from "../../helpers/auth";
import { useEffect, useState } from "react";
import JoinClassItem from "../items/join-class.item";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

const JoinClassSection = (props) => {
  const [classLinks, setclassLinks] = useState([]);
  const loadClasses = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/classlink`, {
        id: isAuth()._id,
        role: isAuth().role,
      })
      .then((res) => {
        if (res.data.classlinks.length) {
          setclassLinks(res.data.classlinks);
        } else toast.error("No class are available now");
      })
      .catch((err) => {
        // toast.error(err.response.data.error);
        console.log(err);
      });
  };
  const bindClasses = () => {
    return classLinks.map((item) => {
      return (
        <JoinClassItem
          key={uuidv4()}
          classlink={item}
          joinClassContent={props.joinClassContent}
          loadClasses={loadClasses}
        />
      );
    });
  };
  useEffect(() => {
    loadClasses();
  }, []);
  return (
    <section>
      <ul>{bindClasses()}</ul>
    </section>
  );
};

export default JoinClassSection;
