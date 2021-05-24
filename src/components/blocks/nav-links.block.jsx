import { isAuth } from "../../helpers/auth";
import Api from "../../helpers/content-api";
import NavLinkItem from "../items/nav-link.item";
import { v4 as uuidv4 } from "uuid";

const NavLinksBlock = (props) => {
  const getNotificationCount = (itemName) => {
    switch (itemName) {
      case "feedbackPage":
        return props.notifications.feedback.length;
      case "activateAccountPage":
        return props.notifications.activationLinks.length;
      case "syllabusPage":
        return props.notifications.syllabus.length;
      case "joinClassPage":
        return props.notifications.joinClass.length;
      default:
        return 0;
    }
  };
  const loadLinks = () => {
    return props.navLinkContent.map((item) => {
      if (item.availableFor.includes(isAuth().role)) {
        let itemClassName = "";
        if (props.selectedPage === item.name) {
          itemClassName = "nav-link-selected";
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

  return <ul className="nav-links">{loadLinks()}</ul>;
};

export default NavLinksBlock;
