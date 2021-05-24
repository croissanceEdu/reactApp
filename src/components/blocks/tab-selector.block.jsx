import { v4 as uuidv4 } from "uuid";
import TabSelectorItem from "../items/tab-selector.item";
import { isAuth } from "../../helpers/auth";

const TabSelectorBlock = (props) => {
  const bindTabSelector = () => {
    return props.tabWindows.map((item) => {
      if (item.availableFor.includes(isAuth().role)) {
        let itemClassName = "";
        if (props.selectedTab === item.name) {
          itemClassName = "selected-tab";
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
  if (props.isAvailable)
    return <ul className="tab-selector-block">{bindTabSelector()}</ul>;
  else return <p className="empty-p">{props.unAvailableMessage}</p>;
};

export default TabSelectorBlock;
