import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TabSelectorBlock from "../blocks/tab-selector.block";
import ManageAllocationListTab from "../tabs/manage-allocation-list.tab";
import ManageAllocationNewTab from "../tabs/manage-allocation-new.tab";

const currencies = require("currencies.json");

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
  const confirmDeleteMap = (id) => {
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
  const deleteMap = (id) => {
    props.popupFunctions.showWarningPopup(
      "Delete Allocation",
      "are you sure?",
      "delete-popup",
      [
        {
          content: "delete",
          className: "btn delete-button",
          closeAfter: true,
          onClickFunction: confirmDeleteMap,
          onClickArgument: id,
        },
        {
          content: "cancel",
          className: "btn cancel-button",
          closeAfter: true,
        },
      ]
    );
  };
  const bindList = (callbackBindItem) => {
    return callbackBindItem(studentMap);
  };
  const bindCurrencies = () => {
    return currencies.currencies.map((el) => {
      return (
        <option key={el.code} value={el.code}>
          {el.code} ({el.name})
        </option>
      );
    });
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
            bindCurrencies={bindCurrencies}
          />
        );
      case "allocationAddTab":
        return (
          <ManageAllocationNewTab
            manageContent={props.manageContent}
            loadStudentMap={loadStudentMap}
            onlineUsers={props.onlineUsers}
            bindCurrencies={bindCurrencies}
            setSelectedTab={setSelectedTab}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="manage-section">
      <div className="navbar-spacer"></div>
      <div className="tab-section">
        <TabSelectorBlock
          tabWindows={props.manageContent.tabWindows}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isAvailable={true}
          unAvailableMessage="no Access"
        />
        {bindTabWindow()}
      </div>
    </section>
  );
};

export default ManageSection;
