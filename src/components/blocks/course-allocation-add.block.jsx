import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import UserSelectorByRoleBlock from "./user-selector-by-role.block";

const CourseAllocationAddBlock = (props) => {
  const [classUrl, setClassUrl] = useState("");
  const [teacherDetails, setTeacherDetails] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const handleTeacherSelect = (user) => {
    setTeacherDetails(user);
  };
  const handleStudentSelect = (user) => {
    setStudentDetails(user);
  };
  const handleClassLinkChange = (e) => {
    setClassUrl(e.target.value);
  };
  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (studentDetails._id && teacherDetails._id) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/syllabus/map/add`, {
          studentID: studentDetails._id,
          teacherID: teacherDetails._id,
          classLink: classUrl,
        })
        .then((response) => {
          toast.success(response.data.message);
          setClassUrl("");
        });
    } else {
      toast.error("please fill all fields");
    }
  };
  return (
    <form
      onSubmit={(formProps) => {
        handleSubmit(formProps);
      }}
    >
      <div className="form-group container">
        <UserSelectorByRoleBlock
          userRole="teacher"
          autoLoad={true}
          handleUserSelect={handleTeacherSelect}
        />
      </div>
      <div className="form-group  container">
        <UserSelectorByRoleBlock
          userRole="student"
          autoLoad={true}
          handleUserSelect={handleStudentSelect}
        />
      </div>
      <div className="form-group container">
        <textarea
          placeholder="class Link"
          className="form-control "
          name="classLink"
          id="classLink"
          rows="3"
          onChange={handleClassLinkChange}
          value={classUrl}
        ></textarea>
      </div>

      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-primary float-right">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default CourseAllocationAddBlock;
