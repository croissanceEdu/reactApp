const SyllabusListTab = (props) => {
  return (
    <div className="tab-window">
      <ol>{props.bindSyllabuses(false)}</ol>
    </div>
  );
};

export default SyllabusListTab;
