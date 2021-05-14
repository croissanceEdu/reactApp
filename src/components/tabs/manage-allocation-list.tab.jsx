import CourseAllocationListBlock from "../blocks/course-allocation-list.block";

const ManageAllocationListTab = (props) => {
  return (
    <CourseAllocationListBlock
      manageContent={props.manageContent}
      bindList={props.bindList}
      deleteMap={props.deleteMap}
      loadStudentMap={props.loadStudentMap}
    />
  );
};

export default ManageAllocationListTab;
