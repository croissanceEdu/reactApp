const WelcomeBanner = (props) => {
  return (
    <>
      <div className="title-banner">
        <h3 className="croissance-title">CROISSANCE EDU</h3>
        <div className="lead">
          <p>
            <strong>We welcome your kid to the world of programming</strong>
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
