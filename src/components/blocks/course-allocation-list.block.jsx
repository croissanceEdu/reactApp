import CourseAllocationItem from "../items/course-allocation.item";
import { v4 as uuidv4 } from "uuid";

const CourseAllocationListBlock = (props) => {
  const bindItem = (itemsList) => {
    return itemsList.map((item) => {
      return (
        <CourseAllocationItem
          key={uuidv4()}
          studentmap={item}
          deleteMap={props.deleteMap}
          manageContent={props.manageContent}
          loadStudentMap={props.loadStudentMap}
        />
      );
    });
  };
  return <ul>{props.bindList(bindItem)}</ul>;
};
export default CourseAllocationListBlock;
