import SyllabusAddBlock from "../blocks/syllabus-add.block";

const SyllabusEditTab = (props) => {
  return (
    <div className="tab-window">
      <ol>{props.bindSyllabuses(true)}</ol>
      <SyllabusAddBlock
        handleAddNewSyllabus={props.handleAddNewSyllabus}
        syllabusContent={props.syllabusContent}
        modules={props.modules}
      />
    </div>
  );
};

export default SyllabusEditTab;
