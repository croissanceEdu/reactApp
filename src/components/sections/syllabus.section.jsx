import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import UserSelectorBlock from "../blocks/user-selector.block";
import SyllabusItem from "../items/syllabus.item";
import { v4 as uuidv4 } from "uuid";
import TeacherStudentSelectorBlock from "../blocks/teacher-student-selector.block";
import SyllabusListTab from "../tabs/syllabus-list.tab";
import SyllabusEditTab from "../tabs/syllabus-edit.tab";
import TabSelectorBlock from "../blocks/tab-selector.block";
import React from "react";
import { manageWebSocketSendNotification } from "../../helpers/websocket-helper";

const SyllabusSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("syllabusListTab");
  const [syllabuses, setSyllabuses] = useState([]);
  const [myDetails, setMyDetails] = useState(
    props.userDetails.role !== "admin" ? props.userDetails : {}
  );
  const [oppDetails, setOppDetails] = useState(null);

  const bindTable = (myId, myRole, oppId, mapId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/list`, {
        _id: myId,
        role: myRole,
        oppId: oppId,
        mapId: mapId,
      })
      .then((response) => {
        if (response.data.syllabus) {
          setSyllabuses(response.data.syllabus);
          props.notify(); //commented for socket test
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const bindSyllabuses = (editMode) => {
    if (!syllabuses.length) return <p className="empty-p">Empty</p>;
    let totalChapter = syllabuses.length;
    let paidChapter = 6.9;
    let feeAmount = oppDetails.studentMap.feesAmount
      ? Number(oppDetails.studentMap.feesAmount)
      : 0;
    let paidAmount = oppDetails.studentMap.paidAmount
      ? Number(oppDetails.studentMap.paidAmount)
      : 0;
    if (paidAmount >= feeAmount) paidChapter = totalChapter;
    else paidChapter = (totalChapter * paidAmount) / feeAmount;
    let moduleName = "";

    let i = 0;
    return syllabuses.map((item) => {
      i++;
      let isModuleChange = true;
      if (moduleName !== item.moduleName) moduleName = item.moduleName;
      else isModuleChange = false;
      return (
        <React.Fragment key={uuidv4()}>
          {isModuleChange && <h3 className="syllabus-module">{moduleName}</h3>}
          <SyllabusItem
            syllabus={item}
            completeSyllabus={completeSyllabus}
            unCheckSyllabus={unCheckSyllabus}
            editMode={editMode}
            deleteSyllabus={deleteSyllabus}
            loginAs={props.userDetails.role}
            syllabusContent={props.syllabusContent}
            itemClass={
              i <= paidChapter
                ? "payed"
                : i - paidChapter < 1
                ? "partial"
                : "unpayed"
            }
          />
        </React.Fragment>
      );
    });
  };
  const handleTeacherStudentSelect = (teacher, student) => {
    setMyDetails(teacher);
    setOppDetails(student);
    bindTable(teacher._id, teacher.role, student._id, student.studentMap._id);
  };
  const handleUserSelect = (user) => {
    setOppDetails(user);
    bindTable(myDetails._id, myDetails.role, user._id, user.studentMap._id);
  };
  const handleRefresh = () => {
    bindTable(
      myDetails._id,
      myDetails.role,
      oppDetails._id,
      oppDetails.studentMap._id
    );
  };
  const completeSyllabus = (id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/complete`, {
        id,
        role: myDetails.role,
      })
      .then((response) => {
        bindTable(
          myDetails._id,
          myDetails.role,
          oppDetails._id,
          oppDetails.studentMap._id
        );
      });
  };
  const unCheckSyllabus = (id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/uncheck`, {
        id,
        role: myDetails.role,
      })
      .then((response) => {
        bindTable(
          myDetails._id,
          myDetails.role,
          oppDetails._id,
          oppDetails.studentMap._id
        );
      });
  };
  const confirmDeleteSyllabus = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/syllabus/list/` + id)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
    setSyllabuses(syllabuses.filter((el) => el._id !== id));
  };
  const deleteSyllabus = (id) => {
    props.popupFunctions.showWarningPopup(
      `Delete Chapter`,
      "are you sure?",
      "delete-popup",
      [
        {
          content: "delete",
          className: "btn delete-button",
          closeAfter: true,
          onClickFunction: confirmDeleteSyllabus,
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
  const handleAddNewSyllabus = (e, callback) => {
    e.preventDefault();
    const chapterName = e.target.chapterName.value;
    const moduleName = e.target.moduleName.value;
    const studentID =
      myDetails.role === "student" ? myDetails._id : oppDetails._id;
    const teacherID =
      myDetails.role === "teacher" ? myDetails._id : oppDetails._id;
    const studentMapID = oppDetails.studentMap._id;

    if (chapterName && studentID && moduleName && teacherID && studentMapID) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/add`, {
          chapterName,
          moduleName,
          studentID,
          teacherID,
          studentMapID,
        })
        .then((response) => {
          toast.success("Submitted successfully");
          callback();
          bindTable(
            myDetails._id,
            myDetails.role,
            oppDetails._id,
            oppDetails.studentMap._id
          );
          manageWebSocketSendNotification(myDetails);
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  const bindTabWindow = () => {
    switch (selectedTab) {
      case "syllabusListTab":
        return (
          <SyllabusListTab
            bindSyllabuses={bindSyllabuses}
            syllabusContent={props.syllabusContent}
          />
        );
      case "editSyllabusTab":
        return (
          <SyllabusEditTab
            bindSyllabuses={bindSyllabuses}
            handleAddNewSyllabus={handleAddNewSyllabus}
            syllabusContent={props.syllabusContent}
          />
        );
      default:
        return null;
    }
  };
  return (
    <section className="syllabus-section">
      <div className="navbar-spacer"></div>
      <h2>{props.syllabusContent.title}</h2>
      {props.userDetails.role === "admin" ? (
        <TeacherStudentSelectorBlock
          myId={props.userDetails._id}
          myRole={props.userDetails.role}
          handleUserSelect={handleTeacherStudentSelect}
          autoLoad={true}
          onlineUsers={props.onlineUsers}
        />
      ) : (
        <UserSelectorBlock
          myId={myDetails._id}
          myRole={myDetails.role}
          handleUserSelect={handleUserSelect}
          autoLoad={true}
          selectedPage={"syllabusPage"}
          notifications={props.notifications}
          notify={props.notify}
          handleRefresh={handleRefresh}
          onlineUsers={props.onlineUsers}
        ></UserSelectorBlock>
      )}
      <div className="tab-section">
        <TabSelectorBlock
          tabWindows={props.syllabusContent.tabWindows}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isAvailable={oppDetails}
          unAvailableMessage="Select one from the list"
        />
        {bindTabWindow()}
      </div>
    </section>
  );
};

export default SyllabusSection;
