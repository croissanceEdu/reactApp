const UserSelectorItem = (props) => {
  return (
    <li
      onClick={() => props.handleUserSelect(props.user)}
      className={props.itemClassName}
    >
      <img
        src={`${process.env.REACT_APP_SERVER_URL}/${
          props.user.imagePath
            ? props.user.imagePath
            : process.env.REACT_APP_DEFAULT_PROFILE_PIC
        }`}
        alt="img"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        }}
      />

      <h2>{props.user.name}</h2>
      <h3>{props.user.email}</h3>
    </li>
  );
};

export default UserSelectorItem;
