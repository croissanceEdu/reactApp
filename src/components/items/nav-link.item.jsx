import { NavLink } from "react-router-dom";

const NavLinkItem = (props) => {
  const onClickEvent = () => {
    if (props.onClickCallBack) {
      props.onClickCallBack();
    }
  };

  return (
    <li className={props.itemClassName}>
      <NavLink
        to={props.navLinkPath}
        exact
        activeClassName="nav-link-selected"
        onClick={onClickEvent}
      >
        {props.content}
      </NavLink>
      {props.notificationCount ? (
        <p className=" badge badge-pill">
          {props.notificationCount === 0 ? null : props.notificationCount}
        </p>
      ) : null}
    </li>
  );
};

export default NavLinkItem;
