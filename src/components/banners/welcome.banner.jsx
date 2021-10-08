const WelcomeBanner = (props) => {
  return (
    <>
      <div className="title-banner">
        <h3 className="croissance-title">{props.homeContent.titleContent}</h3>
        <div className="lead">
          <p>
            <strong>{props.homeContent.introContent}</strong>
          </p>
        </div>
      </div>
      <div className="banner container welcome-banner">
        <h2>
          {props.homeContent.welcomeContent}{" "}
          <span>{props.userDetails.name}</span>,
        </h2>
      </div>
    </>
  );
};

export default WelcomeBanner;
