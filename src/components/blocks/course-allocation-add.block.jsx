import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import UserSelectorByRoleBlock from "./user-selector-by-role.block";

const CourseAllocationAddBlock = (props) => {
  const [classUrl, setClassUrl] = useState("");
  const [teacherDetails, setTeacherDetails] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const [formData, setFormData] = useState({
    courseName: "",
    feesAmount: 0,
    feesCurrency: "$",
    paidAmount: 0,
  });
  const handleTeacherSelect = (user) => {
    setTeacherDetails(user);
  };
  const handleStudentSelect = (user) => {
    setStudentDetails(user);
  };
  const handleClassLinkChange = (e) => {
    setClassUrl(e.target.value);
  };

  const handleFormdataChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
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
          courseName: formData.courseName,
          feesAmount: formData.feesAmount,
          feesCurrency: formData.feesCurrency,
          paidAmount: formData.paidAmount,
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
      <div className="teacher-student">
        <UserSelectorByRoleBlock
          userRole="teacher"
          autoLoad={true}
          handleUserSelect={handleTeacherSelect}
        />

        <UserSelectorByRoleBlock
          userRole="student"
          autoLoad={true}
          handleUserSelect={handleStudentSelect}
        />
      </div>
      <div className="form-group container">
        <input
          type="text"
          className="form-control"
          name="inputCourse"
          id="inputCourse"
          aria-describedby="helpId"
          placeholder="Course Name"
          required
          onChange={handleFormdataChange("courseName")}
          value={formData.courseName}
        />
      </div>
      <div className="form-group container ">
        <label htmlFor="inputCourse">Fee</label>
        <input
          type="text"
          className="form-control  container"
          name="inputFee"
          id="inputFee"
          aria-describedby="helpId"
          placeholder="Fee"
          required
          onChange={handleFormdataChange("feesAmount")}
          value={formData.feesAmount}
        />
      </div>
      <div className="form-group container ">
        <input
          type="text"
          className="form-control "
          name="inputCurrency"
          id="inputCurrency"
          aria-describedby="helpId"
          placeholder="Currency"
          required
          onChange={handleFormdataChange("feesCurrency")}
          value={formData.feesCurrency}
        />
      </div>

      <div className="form-group container ">
        <label htmlFor="inputCourse">Paid Ammount</label>
        <input
          type="text"
          className="form-control  container"
          name="inputPaid"
          id="inputPaid"
          aria-describedby="helpId"
          placeholder="Paid Ammount"
          required
          onChange={handleFormdataChange("paidAmount")}
          value={formData.paidAmount}
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
      <div className="form-group  container text-center justify-content-center">
        <button type="submit" className="btn save-button">
          Save
        </button>
      </div>
    </form>
  );
};
export default CourseAllocationAddBlock;
