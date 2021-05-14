const TeacherStudentSelectorItem = (props) => {
  return (
    <li
      onClick={() => props.handleUserSelect(props.user)}
      className={props.itemClassName}
    >
      <h2>
        {props.user.teacher.name}-{props.user.student.name}
      </h2>
      <h3>
        {props.user.teacher.email}-{props.user.student.email}
      </h3>
    </li>
  );
};

export default TeacherStudentSelectorItem;
