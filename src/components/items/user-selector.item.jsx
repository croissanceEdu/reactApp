const UserSelectorItem = (props) => {
  return (
    <li
      onClick={() => props.handleUserSelect(props.user)}
      className={props.itemClassName}
    >
      <div className="avatar-name">
        <div className="user-avatar">
          <div
            className="avatar-img"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/${
                props.user.imagePath
                  ? props.user.imagePath
                  : process.env.REACT_APP_DEFAULT_PROFILE_PIC
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "100%",
              width: "100%",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <h3>{props.user.name}</h3>

        <span className=" badge badge-pill">
          {props.user.notificationCount === 0
            ? null
            : props.user.notificationCount}
        </span>
      </div>
      <p>{props.user.studentMap ? props.user.studentMap.courseName : null}</p>
    </li>
  );
};

export default UserSelectorItem;
