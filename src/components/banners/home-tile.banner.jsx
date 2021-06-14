const HomeTileBanner = (props) => {
  let notificationClass = " ";

  if (props.notifications)
    if (props.notifications.length) notificationClass = "with-notification";
  return (
    <div
      className={`banner container feedback-banner ${notificationClass}`}
      onClick={props.handleBannerClick}
    >
      <h2>{props.displayContent.titleContent}</h2>
      {props.notifications ? (
        props.notifications.length ? (
          <p className="banner-notification">
            {props.notifications.length === 1
              ? props.displayContent.notificationSingleContent[props.userRole]
              : props.displayContent.notificationContent[
                  props.userRole
                ].replace("@number@", props.notifications.length)}
          </p>
        ) : null
      ) : null}
      <p>{props.displayContent.clickHereContent}</p>
    </div>
  );
};

export default HomeTileBanner;
