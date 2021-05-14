import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import Api from "../../helpers/content-api";
import NavLinkItem from "../items/nav-link.item";
import { v4 as uuidv4 } from "uuid";

const NavLinksBlock = (props) => {
  useEffect(() => {
    if (isAuth().role === "admin") bindActivationLinks();
    bindMessages();
  }, []);
  let navLinkContent = Api.getNavLinkContent();

  const [feedback, setFeedback] = useState([]);
  const [activationLinks, setActivationLinks] = useState([]);
  const bindMessages = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/feedback/notify`, {
        _id: isAuth()._id,
      })
      .then((response) => {
        setFeedback(response.data.feedback);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  const bindActivationLinks = () => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/notify`, {
        _Id: isAuth()._id,
        role: isAuth().role,
      })
      .then((res) => {
        if (res.data.activationLinks.length) {
          setActivationLinks(res.data.activationLinks);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const getNotificationCount = (itemName) => {
    switch (itemName) {
      case "feedbackPage":
        return feedback.length;
      case "activateAccountPage":
        return activationLinks.length;
      default:
        return 0;
    }
  };
  const loadLinks = () => {
    return navLinkContent.navLinks.map((item) => {
      if (item.availableFor.includes(isAuth().role)) {
        let itemClassName = "";
        if (props.selectedPage === item.name) {
          itemClassName = "text-danger";
        }
        return (
          <NavLinkItem
            content={item.content}
            navLinkPath={Api.getNavLinkPath(item.name)}
            notificationCount={getNotificationCount(item.name)}
            key={uuidv4()}
            itemClassName={itemClassName}
          />
        );
      } else return null;
    });
  };

  return (
    <nav>
      <ul>{loadLinks()}</ul>
    </nav>
  );
};

export default NavLinksBlock;
