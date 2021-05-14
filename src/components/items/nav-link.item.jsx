const NavLinkItem = (props) => {
  return (
    <li className={props.itemClassName}>
      <a href={props.navLinkPath}>
        {props.content}
        <span className="badge-success badge badge-pill">
          {props.notificationCount === 0 ? null : props.notificationCount}
        </span>
      </a>
    </li>
  );
};

export default NavLinkItem;
