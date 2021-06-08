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
        <div className="name-course-block">
          <div className="name-block">
            <h3>
              {props.user.teacher.name}-{props.user.student.name}
            </h3>
          </div>{" "}
          <p>
            {props.user.student.studentMap
              ? props.user.student.studentMap.courseName
              : null}
          </p>
        </div>
      </div>
    </li>
  );
};

export default TeacherStudentSelectorItem;
