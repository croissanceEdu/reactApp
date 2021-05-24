const NavLinkItem = (props) => {
  return (
    <li className={props.itemClassName}>
      <a href={props.navLinkPath}>{props.content}</a>
      <p className=" badge badge-pill">
        {props.notificationCount === 0 ? null : props.notificationCount}
      </p>
    </li>
  );
};

export default NavLinkItem;
