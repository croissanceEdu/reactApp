import { useState } from "react";

const SyllabusAddBlock = (props) => {
  const [formData, setFormData] = useState({
    chapterName: "",
    moduleName: "",
  });
  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const clearChapter = () => {
    setFormData({ ...formData, chapterName: "" });
  };
  return (
    <form
      onSubmit={(formProps) => {
        props.handleAddNewSyllabus(formProps, clearChapter);
      }}
    >
      <div className="form-group  row p-2 m-2 ">
        <div className="container">
          <input
            type="text"
            className="form-control"
            name="chapterName"
            id="chapterName"
            placeholder={props.syllabusContent.chapterContent}
            onChange={handleChange("chapterName")}
            value={formData.chapterName}
          />
        </div>
      </div>
      <div className="form-group row p-2 m-2">
        <div className="container">
          <input
            type="text"
            className="form-control"
            name="moduleName"
            id="moduleName"
            placeholder={props.syllabusContent.moduleContent}
            onChange={handleChange("moduleName")}
            value={formData.moduleName}
          />
        </div>
      </div>

      <div className="form-group row">
        <div className="container">
          <button type="submit" className="btn btn-primary">
            {props.syllabusContent.addContent}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SyllabusAddBlock;
