import CourseAllocationAddBlock from "../blocks/course-allocation-add.block";

const ManageAllocationNewTab = (props) => {
  return (
    <div className="tab-window">
      <CourseAllocationAddBlock
        manageContent={props.manageContent}
        loadStudentMap={props.loadStudentMap}
        onlineUsers={props.onlineUsers}
        bindCurrencies={props.bindCurrencies}
        setSelectedTab={props.setSelectedTab}
      />
    </div>
  );
};

export default ManageAllocationNewTab;
