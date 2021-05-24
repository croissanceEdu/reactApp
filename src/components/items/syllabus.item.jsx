const SyllabusItem = (props) => {
  return (
    <li className={props.itemClass}>
      <div className="all-details">
        <div className="primary-details">
          <div>
            <small>Chapter:</small>
            {props.syllabus.chapterName}{" "}
            <small className="chapter-badge">
              {props.syllabus.isNewStatus ? (
                <span className="badge badge-dark badge-pill text-white">
                  New
                </span>
              ) : null}
            </small>
          </div>
          <div>
            <small>Module:</small>
            {props.syllabus.moduleName}
          </div>
        </div>
        <div className="secondary-details">
          {props.editMode ? null : (
            <>
              <div>
                <input
                  type="checkbox"
                  name="teacherComplete"
                  id="teacherComplete"
                  checked={props.syllabus.teacherComplete}
                  value={props.syllabus.teacherComplete}
                  readOnly
                />
                <label htmlFor="teacherComplete">Teacher</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="studentComplete"
                  id="studentComplete"
                  checked={props.syllabus.studentComplete}
                  value={props.syllabus.studentComplete}
                  readOnly
                />
                <label htmlFor="studentComplete">Student</label>
              </div>
            </>
          )}
        </div>
      </div>
      {props.editMode ? (
        <button
          onClick={() => {
            props.deleteSyllabus(props.syllabus._id);
          }}
        >
          {props.syllabusContent.deleteContent}
        </button>
      ) : props.loginAs === "admin" ? null : (props.loginAs === "teacher" &&
          props.syllabus.teacherComplete) ||
        (props.loginAs === "student" && props.syllabus.studentComplete) ? (
        props.syllabusContent.uncheckableMode ? (
          <button
            onClick={() => {
              props.unCheckSyllabus(props.syllabus._id);
            }}
          >
            {props.syllabusContent.uncheckCompleteContent}
          </button>
        ) : null
      ) : (
        <button
          onClick={() => {
            props.completeSyllabus(props.syllabus._id);
          }}
        >
          {props.syllabusContent.checkCompleteContent}
        </button>
      )}
    </li>
  );
};

export default SyllabusItem;
