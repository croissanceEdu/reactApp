const JoinClassBanner = (props) => {
  let displayContent = {};
  if (props.homeContent) {
    displayContent = props.homeContent.banners.find(
      (el) => el.name === "joinClassBanner"
    );
  }
  return (
    <div
      className="banner container join-class-banner"
      onClick={props.handleJoinClassBannerClick}
    >
      <h2>{displayContent.titleContent}</h2>
      <p>{displayContent.clickHereContent}</p>
    </div>
  );
};

export default JoinClassBanner;
