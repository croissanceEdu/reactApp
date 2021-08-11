import { Redirect, useHistory } from "react-router-dom";

import StudentHomeSection from "../sections/student-home.section";
import { useEffect } from "react";
import TeacherHomeSection from "../sections/teacher-home.section";
import AdminHomeSection from "../sections/admin-home.section";
import { getHomeContent } from "../../helpers/content-api";

const HomePage = (props) => {
  const history = useHistory();
  useEffect(() => {
    props.setselectedPage("homePage");
  }, [props]);
  const handleSyllabusBannerClick = () => {
    history.push(props.urlPathContent.syllabusPage);
    // window.location = props.urlPathContent.syllabusPage;
  };
  const handleFeedbackBannerClick = () => {
    history.push(props.urlPathContent.feedbackPage);
  };
  const handleJoinClassBannerClick = () => {
    history.push(props.urlPathContent.joinClassPage);
  };
  const handleProfileBannerClick = () => {
    history.push(props.urlPathContent.profilePage);
  };
  const handleManageBannerClick = () => {
    history.push(props.urlPathContent.managePage);
  };
  const handleActivateAccountBannerClick = () => {
    history.push(props.urlPathContent.activateAccountPage);
  };
  const handlePaymentBannerClick = () => {
    history.push(props.urlPathContent.paymentPage);
  };

  if (props.userDetails) {
    switch (props.userDetails.role) {
      case "student":
        return (
          <StudentHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleFeedbackBannerClick={handleFeedbackBannerClick}
            handleJoinClassBannerClick={handleJoinClassBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            handlePaymentBannerClick={handlePaymentBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      case "teacher":
        return (
          <TeacherHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleFeedbackBannerClick={handleFeedbackBannerClick}
            handleJoinClassBannerClick={handleJoinClassBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            handlePaymentBannerClick={handlePaymentBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      case "admin":
        return (
          <AdminHomeSection
            homeContent={getHomeContent(props.language)}
            userDetails={props.userDetails}
            handleSyllabusBannerClick={handleSyllabusBannerClick}
            handleProfileBannerClick={handleProfileBannerClick}
            handleManageBannerClick={handleManageBannerClick}
            handleActivateAccountBannerClick={handleActivateAccountBannerClick}
            handlePaymentBannerClick={handlePaymentBannerClick}
            notifications={props.notifications}
            profilePicture={props.profilePicture}
          />
        );
      default:
        return <Redirect to={props.urlPathContent.loginPage} />;
    }
  } else return <Redirect to={props.urlPathContent.loginPage} />;
};

export default HomePage;
