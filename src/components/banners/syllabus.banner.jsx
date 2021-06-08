const SyllabusBanner = (props) => {
  let notificationClass = " ";
  let displayContent = {};
  if (props.homeContent) {
    displayContent = props.homeContent.banners.find(
      (el) => el.name === "syllabusBanner"
    );
  }
  if (props.notifications)
    if (props.notifications.length) notificationClass = "with-notification";
  return (
    <div
      className={`banner container syllabus-banner ${notificationClass}`}
      onClick={props.handleSyllabusBannerClick}
    >
      <h2>{displayContent.titleContent}</h2>
      {props.notifications ? (
        props.notifications.length ? (
          <p className="banner-notification">
            {props.notifications.length === 1
              ? displayContent.notificationSingleContent
              : displayContent.notificationContent.replace(
                  "@number@",
                  props.notifications.length
                )}
          </p>
        ) : null
      ) : null}
      <p>{displayContent.clickHereContent}</p>
    </div>
  );
};

export default SyllabusBanner;
