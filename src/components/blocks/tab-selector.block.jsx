import { v4 as uuidv4 } from "uuid";
import TabSelectorItem from "../items/tab-selector.item";
import { isAuth } from "../../helpers/auth";

const TabSelectorBlock = (props) => {
  const bindTabSelector = () => {
    return props.tabWindows.map((item) => {
      if (item.availableFor.includes(isAuth().role)) {
        let itemClassName = "";
        if (props.selectedTab === item.name) {
          itemClassName = "text-danger";
        }
        return (
          <TabSelectorItem
            tabWindow={item}
            setSelectedTab={props.setSelectedTab}
            key={uuidv4()}
            itemClassName={itemClassName}
          />
        );
      } else return null;
    });
  };
  return <ul>{bindTabSelector()}</ul>;
};

export default TabSelectorBlock;
