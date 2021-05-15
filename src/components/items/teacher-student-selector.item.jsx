const TeacherStudentSelectorItem = (props) => {
  return (
    <li
      onClick={() => props.handleUserSelect(props.user)}
      className={props.itemClassName}
    >
      <img
        src={`${process.env.REACT_APP_SERVER_URL}/${
          props.user.teacher.imagePath
            ? props.user.teacher.imagePath
            : process.env.REACT_APP_DEFAULT_PROFILE_PIC
        }`}
        alt="img"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
      <h2>
        {props.user.teacher.name}-{props.user.student.name}
      </h2>
      <h3>
        {props.user.teacher.email}-{props.user.student.email}
      </h3>

      <img
        src={`${process.env.REACT_APP_SERVER_URL}/${
          props.user.student.imagePath
            ? props.user.student.imagePath
            : process.env.REACT_APP_DEFAULT_PROFILE_PIC
        }`}
        alt="img"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    </li>
  );
};

export default TeacherStudentSelectorItem;
