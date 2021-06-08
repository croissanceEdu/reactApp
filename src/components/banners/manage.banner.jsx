const ManageBanner = (props) => {
  let displayContent = {};
  if (props.homeContent) {
    displayContent = props.homeContent.banners.find(
      (el) => el.name === "manageBanner"
    );
  }
  return (
    <div
      className="banner container manage-banner"
      onClick={props.handleManageBannerClick}
    >
      <h2>{displayContent.titleContent}</h2>
      <p>{displayContent.clickHereContent}</p>
    </div>
  );
};

export default ManageBanner;
