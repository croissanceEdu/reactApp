import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TabSelectorBlock from "../blocks/tab-selector.block";
import ManageAllocationListTab from "../tabs/manage-allocation-list.tab";
import ManageAllocationNewTab from "../tabs/manage-allocation-new.tab";

const ManageSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("allocateTab");
  const [studentMap, setStudentMap] = useState([]);
  useEffect(() => {
    loadStudentMap();
  }, []);
  const loadStudentMap = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/syllabus/map`)
      .then((response) => {
        setStudentMap(response.data.studentMap);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteMap = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/` + id)
      .then((response) => {
        toast.success(response.data.message);
        setStudentMap(studentMap.filter((el) => el._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const bindList = (callbackBindItem) => {
    return callbackBindItem(studentMap);
  };
  const bindTabWindow = () => {
    switch (selectedTab) {
      case "allocateTab":
        return (
          <ManageAllocationListTab
            manageContent={props.manageContent}
            bindList={bindList}
            deleteMap={deleteMap}
            loadStudentMap={loadStudentMap}
          />
        );
      case "allocationAddTab":
        return (
          <ManageAllocationNewTab
            manageContent={props.manageContent}
            loadStudentMap={loadStudentMap}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section>
      <TabSelectorBlock
        tabWindows={props.manageContent.tabWindows}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isAvailable={true}
        unAvailableMessage="no Access"
      />
      {bindTabWindow()}
    </section>
  );
};

export default ManageSection;
