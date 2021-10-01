import { Menu as MenuIcon, Close as CloseIcon } from "@material-ui/icons";

const NavMenuIconBlock = (props) => {
  const handleClick = () => {
    props.setNavVisible(!props.navStyles.isNavMenuOpen);
  };
  let notificationCount = 0;
  const getNotificationCount = () => {
    if (props.notifications)
      notificationCount =
        props.notifications.feedback.length +
        props.notifications.activationLinks.length +
        props.notifications.syllabus.length +
        props.notifications.joinClass.length;

    return notificationCount;
  };
  return (
    <div className="nav-menu-table-cell">
      <button className="nav-toggler-icon" onClick={handleClick}>
        {!props.navStyles.isNavMenuOpen ? (
          <>
            <MenuIcon style={{ color: "#fff" }} />
            {getNotificationCount() > 0 ? (
              <div className=" ">
                <p>{notificationCount < 10 ? notificationCount : "9+"}</p>
              </div>
            ) : null}
          </>
        ) : (
          <CloseIcon style={{ color: "#fff" }} />
        )}
      </button>
    </div>
  );
};

export default NavMenuIconBlock;
