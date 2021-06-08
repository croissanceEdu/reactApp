import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import ActivateAccountItem from "../items/activate-account.item";

const ActivateAccountSection = (props) => {
  const [activationLinks, setActivationLinks] = useState([]);
  const getActivationLinks = () => {
    if (props.userDetails && props.userDetails.role === "admin") {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/getforactivation`, {
          _Id: props.userDetails._id,
          role: props.userDetails.role,
        })
        .then((res) => {
          if (res.data.activationLinks.length) {
            setActivationLinks(res.data.activationLinks);
          } else console.log("No Activation links are available now");
        })
        .catch((err) => {
          if (err.response) console.log(err.response.data.error);
          else console.log(err);
        });
    } else {
      console.log("err");
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
    <section className="activation-section">
      <div className="navbar-spacer"></div>
      <ul>{BindActivationLinks()}</ul>
    </section>
  );
};

export default ActivateAccountSection;
