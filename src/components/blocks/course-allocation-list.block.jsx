import CourseAllocationItem from "../items/course-allocation.item";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const CourseAllocationListBlock = (props) => {
  const [selectedAllocation, setSelectedAllocation] = useState({});
  const [visibilityclass, setVisibilityclass] = useState("");

  const handleAllocationSelect = (slectedItem) => {
    if (visibilityclass === "") setVisibilityclass("collapse-block");
    setSelectedAllocation(slectedItem);
  };
  const handleBackButtonClick = (slectedItem) => {
    // setVisibilityclass("");
  };
  const handleDeleteButtonClick = (slectedItem) => {
    props.deleteMap(slectedItem);
  };

  const bindItem = (itemsList) => {
    return itemsList.map((item) => {
      let itemClassName = "non-selected";
      if (selectedAllocation._id === item._id) {
        itemClassName = "selected-allocation";
      }

      return (
        <CourseAllocationItem
          key={uuidv4()}
          studentMap={item}
          deleteMap={handleDeleteButtonClick}
          manageContent={props.manageContent}
          loadStudentMap={props.loadStudentMap}
          handleAllocationSelect={handleAllocationSelect}
          handleBackButtonClick={handleBackButtonClick}
          itemClassName={itemClassName}
          bindCurrencies={props.bindCurrencies}
          setVisibilityclass={setVisibilityclass}
        />
      );
    });
  };
  return (
    <ul className={`course-allocation-list ${visibilityclass}`}>
      {props.bindList(bindItem)}
    </ul>
  );
};
export default CourseAllocationListBlock;
