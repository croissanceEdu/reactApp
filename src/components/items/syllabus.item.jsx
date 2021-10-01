const SyllabusItem = (props) => {
  return (
    <li className={props.itemClass}>
      <div className="all-details">
        <div className="primary-details">
          <div>
            <h3>{props.syllabus.chapterName}</h3>
            {props.syllabus.isNewStatus ? (
              <small className="badge badge-dark badge-pill text-white">
                New
              </small>
            ) : null}
          </div>
        </div>
        <div className="secondary-details">
          <div className="checkbox-details">
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

          {props.editMode ? (
            props.syllabus.teacherComplete || props.syllabus.studentComplete ? (
              <button
                className="delete-button"
                disabled
                onClick={() => {
                  alert("Not Allowed");
                  // props.deleteSyllabus(props.syllabus._id);
                }}
              >
                {props.syllabusContent.deleteContent}
              </button>
            ) : (
              <button
                className="delete-button"
                onClick={() => {
                  props.deleteSyllabus(props.syllabus._id);
                }}
              >
                {props.syllabusContent.deleteContent}
              </button>
            )
          ) : props.loginAs === "admin" ? null : (props.loginAs === "teacher" &&
              props.syllabus.teacherComplete) ||
            (props.loginAs === "student" && props.syllabus.studentComplete) ? (
            props.syllabusContent.uncheckableMode ? (
              <button
                className="save-button"
                onClick={() => {
                  props.unCheckSyllabus(props.syllabus._id);
                }}
              >
                {props.syllabusContent.uncheckCompleteContent}
              </button>
            ) : (
              <button
                className="primary-button"
                disabled
                onClick={() => {
                  props.completeSyllabus(props.syllabus._id);
                }}
              >
                {props.syllabusContent.completedContent}
              </button>
            )
          ) : (
            <button
              className="primary-button"
              onClick={() => {
                props.completeSyllabus(props.syllabus._id);
              }}
            >
              {props.syllabusContent.checkCompleteContent}
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default SyllabusItem;
