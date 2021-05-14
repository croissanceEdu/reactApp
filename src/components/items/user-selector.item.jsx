const UserSelectorItem = (props) => {
  return (
    <li
      onClick={() => props.handleUserSelect(props.user)}
      className={props.itemClassName}
    >
      <h2>{props.user.name}</h2>
      <h3>{props.user.email}</h3>
    </li>
  );
};

export default UserSelectorItem;
