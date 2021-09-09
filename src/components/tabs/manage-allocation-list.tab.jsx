import CourseAllocationListBlock from "../blocks/course-allocation-list.block";

const ManageAllocationListTab = (props) => {
  return (
    <div className="tab-window">
      <CourseAllocationListBlock
        manageContent={props.manageContent}
        bindList={props.bindList}
        deleteMap={props.deleteMap}
        loadStudentMap={props.loadStudentMap}
        bindCurrencies={props.bindCurrencies}
      />
    </div>
  );
};

export default ManageAllocationListTab;
