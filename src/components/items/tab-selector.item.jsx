const TabSelectorItem = (props) => {
  return (
    <li
      onClick={() => {
        props.setSelectedTab(props.tabWindow.name);
      }}
      className={props.itemClassName}
    >
      {props.tabWindow.content}
    </li>
  );
};

export default TabSelectorItem;
