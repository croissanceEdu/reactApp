import { useState } from "react";
import { Cancel, Add, List, Edit } from "@material-ui/icons";
const SyllabusAddBlock = (props) => {
  const [formData, setFormData] = useState({
    chapterName: "",
    moduleName: "",
  });
  const [isNewModule, setIsNewModule] = useState(false);
  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleChangeIsNewModule = (status) => (e) => {
    setIsNewModule(status);
  };
  const clearChapter = () => {
    setFormData({ ...formData, chapterName: "" });
    setIsNewModule(false);
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

      <div className="form-group row p-2 m-2 module-group">
        {isNewModule ? (
          <div className="container ">
            <input
              type="text"
              className="form-control"
              name="moduleName"
              id="moduleName"
              placeholder={props.syllabusContent.moduleContent}
              onChange={handleChange("moduleName")}
              value={formData.moduleName}
            />
            <button
              className="back-button"
              onClick={handleChangeIsNewModule(false)}
            >
              <List />
            </button>
          </div>
        ) : (
          <div className="container">
            <select
              className="custom-select form-control"
              name="moduleName"
              id="moduleName"
              placeholder={props.syllabusContent.moduleContent}
              value={formData.moduleName}
              onChange={handleChange("moduleName")}
            >
              <option value="">{props.syllabusContent.moduleContent}</option>
              {props.modules.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>{" "}
            <button
              className="edit-button"
              onClick={handleChangeIsNewModule(true)}
            >
              <Edit />
            </button>
          </div>
        )}
      </div>

      <div className="form-group row">
        <div className="container">
          <button type="submit" className="btn primary-button">
            {props.syllabusContent.addContent}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SyllabusAddBlock;
