const SyllabusItem = (props) => {
  return (
    <li>
      <div>{props.syllabus.chapterName}</div>
      <div>{props.syllabus.moduleName}</div>
      {props.editMode ? (
        <>
          <button
            onClick={() => {
              props.deleteSyllabus(props.syllabus._id);
            }}
          >
            {props.syllabusContent.deleteContent}
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            name="teacherComplete"
            id="teacherComplete"
            checked={props.syllabus.teacherComplete}
            value={props.syllabus.teacherComplete}
            readOnly
          />
          <input
            type="checkbox"
            name="studentComplete"
            id="studentComplete"
            checked={props.syllabus.studentComplete}
            value={props.syllabus.studentComplete}
            readOnly
          />
          {props.loginAs === "admin" ? null : (props.loginAs === "teacher" &&
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
        </>
      )}
    </li>
  );
};

export default SyllabusItem;
