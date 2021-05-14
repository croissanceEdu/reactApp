import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import UserSelectorBlock from "../blocks/user-selector.block";
import SyllabusItem from "../items/syllabus.item";
import { v4 as uuidv4 } from "uuid";
import TeacherStudentSelectorBlock from "../blocks/teacher-student-selector.block";
import SyllabusListTab from "../tabs/syllabus-list.tab";
import SyllabusEditTab from "../tabs/syllabus-edit.tab";
import TabSelectorBlock from "../blocks/tab-selector.block";

const SyllabusSection = (props) => {
  const [selectedTab, setSelectedTab] = useState("syllabusListTab");
  const [syllabuses, setSyllabuses] = useState([]);
  const [myDetails, setMyDetails] = useState(isAuth());
  const [oppDetails, setOppDetails] = useState({});

  const bindTable = (myId, myRole, oppId) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/list`, {
        _id: myId,
        role: myRole,
        oppId: oppId,
      })
      .then((response) => {
        if (response.data.syllabus) {
          setSyllabuses(response.data.syllabus);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const bindSyllabuses = (editMode) => {
    return syllabuses.map((item) => {
      return (
        <SyllabusItem
          syllabus={item}
          key={uuidv4()}
          completeSyllabus={completeSyllabus}
          unCheckSyllabus={unCheckSyllabus}
          editMode={editMode}
          deleteSyllabus={deleteSyllabus}
          loginAs={isAuth().role}
          syllabusContent={props.syllabusContent}
        />
      );
    });
  };
  const handleTeacherStudentSelect = (user) => {
    setMyDetails(user.teacher);
    setOppDetails(user.student);
    bindTable(user.teacher._id, user.teacher.role, user.student._id);
  };
  const handleUserSelect = (user) => {
    setOppDetails(user);
    bindTable(myDetails._id, myDetails.role, user._id);
  };
  const completeSyllabus = (id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/complete`, {
        id,
        role: myDetails.role,
      })
      .then((response) => {
        bindTable(myDetails._id, myDetails.role, oppDetails._id);
      });
  };
  const unCheckSyllabus = (id) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/uncheck`, {
        id,
        role: myDetails.role,
      })
      .then((response) => {
        bindTable(myDetails._id, myDetails.role, oppDetails._id);
      });
  };
  const deleteSyllabus = (id) => {
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
  const handleAddNewSyllabus = (e, callback) => {
    e.preventDefault();
    const chapterName = e.target.chapterName.value;
    const moduleName = e.target.moduleName.value;
    const studentID =
      myDetails.role === "student" ? myDetails._id : oppDetails._id;
    const teacherID =
      myDetails.role === "teacher" ? myDetails._id : oppDetails._id;

    if (chapterName && studentID && moduleName && teacherID) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/add`, {
          chapterName,
          moduleName,
          studentID,
          teacherID,
        })
        .then((response) => {
          toast.success("Submitted successfully");
          callback();
          bindTable(myDetails._id, myDetails.role, oppDetails._id);
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
    <section>
      <h2>{props.syllabusContent.title}</h2>
      {isAuth().role === "admin" ? (
        <TeacherStudentSelectorBlock
          myId={myDetails._id}
          myRole={myDetails.role}
          handleUserSelect={handleTeacherStudentSelect}
          autoLoad={true}
        />
      ) : (
        <UserSelectorBlock
          myId={myDetails._id}
          myRole={myDetails.role}
          handleUserSelect={handleUserSelect}
          autoLoad={true}
        ></UserSelectorBlock>
      )}
      <TabSelectorBlock
        tabWindows={props.syllabusContent.tabWindows}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {bindTabWindow()}
    </section>
  );
};

export default SyllabusSection;
