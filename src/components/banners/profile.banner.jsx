const ProfileBanner = (props) => {
  let notificationClass = " ";
  let displayContent = {};
  if (props.homeContent) {
    displayContent = props.homeContent.banners.find(
      (el) => el.name === "profileBanner"
    );
  }
  if (props.profilePicture)
    if (
      props.profilePicture ===
      `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`
    )
      notificationClass = "with-notification";

  return (
    <div
      className={`banner container profile-banner ${notificationClass}`}
      onClick={props.handleProfileBannerClick}
    >
      <h2>{displayContent.titleContent}</h2>
      {props.profilePicture ? (
        props.profilePicture ===
        `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}` ? (
          <p className="banner-notification">
            {displayContent.notificationNoProfilePictureContent}
          </p>
        ) : null
      ) : null}

      <p> {displayContent.clickHereContent}</p>
    </div>
  );
};

export default ProfileBanner;
