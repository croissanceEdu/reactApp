const TeacherStudentSelectorItem = (props) => {
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
                props.user.teacher.imagePath
                  ? props.user.teacher.imagePath
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

        <h2>
          {props.user.teacher.name}-{props.user.student.name}
        </h2>

        <div className="user-avatar">
          <div
            className="avatar-img"
            style={{
              backgroundImage: `url(${process.env.REACT_APP_SERVER_URL}/${
                props.user.student.imagePath
                  ? props.user.student.imagePath
                  : process.env.REACT_APP_DEFAULT_PROFILE_PIC
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>{" "}
      {/* <p>
        {props.user.teacher.email}-{props.user.student.email}
      </p> */}
    </li>
  );
};

export default TeacherStudentSelectorItem;
