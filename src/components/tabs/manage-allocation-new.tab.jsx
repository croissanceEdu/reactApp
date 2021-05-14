import CourseAllocationAddBlock from "../blocks/course-allocation-add.block";

const ManageAllocationNewTab = (props) => {
  return (
    <CourseAllocationAddBlock
      manageContent={props.manageContent}
      loadStudentMap={props.loadStudentMap}
    />
  );
};

export default ManageAllocationNewTab;
