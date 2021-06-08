const UserAvatarBlock = (props) => {
  return (
    <div className="avatar-name">
      <h5>{props.user.role.toUpperCase()}</h5>
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
    </div>
  );
};

export default UserAvatarBlock;
