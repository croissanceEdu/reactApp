import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { isAuth } from "../../helpers/auth";
import ActivateAccountItem from "../items/activate-account.item";

const ActivateAccountSection = () => {
  const [activationLinks, setActivationLinks] = useState([]);
  const getActivationLinks = () => {
    if (isAuth() && isAuth().role === "admin") {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/getforactivation`, {
          _Id: isAuth()._id,
          role: isAuth().role,
        })
        .then((res) => {
          if (res.data.activationLinks.length) {
            setActivationLinks(res.data.activationLinks);
          } else toast.error("No Activation links are available now");
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("err");
    }
  };
  useEffect(() => {
    getActivationLinks();
  }, []);
  const DeleteActivationLink = (id) => {
    setActivationLinks(activationLinks.filter((el) => el._id !== id));
  };
  const BindActivationLinks = () => {
    return activationLinks.map((activationLinkDetails) => {
      return (
        <ActivateAccountItem
          activationLinkDetails={activationLinkDetails}
          DeleteActivationLink={DeleteActivationLink}
          getActivationLinks={getActivationLinks}
          key={uuidv4()}
        />
      );
    });
  };

  return (
    <section>
      <div>Activate Users</div>
      <ul>{BindActivationLinks()}</ul>
    </section>
  );
};

export default ActivateAccountSection;
