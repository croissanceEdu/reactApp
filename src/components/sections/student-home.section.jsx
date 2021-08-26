import FeedbackBanner from "../banners/feedback.banner";
import HomeTileBanner from "../banners/home-tile.banner";
import JoinClassBanner from "../banners/join-class.banner";
import ProfileBanner from "../banners/profile.banner";
import SyllabusBanner from "../banners/syllabus.banner";
import WelcomeBanner from "../banners/welcome.banner";

const StudentHomeSection = (props) => {
  return (
    <section className="home-section">
      <div className="navbar-spacer"></div>
      <div className="home-main-block">
        <WelcomeBanner
          userDetails={props.userDetails}
          homeContent={props.homeContent}
        />
        <div className="banners-block  container">
          <SyllabusBanner
            homeContent={props.homeContent}
            handleSyllabusBannerClick={props.handleSyllabusBannerClick}
            notifications={props.notifications.syllabus}
          />
          <FeedbackBanner
            homeContent={props.homeContent}
            handleFeedbackBannerClick={props.handleFeedbackBannerClick}
            notifications={props.notifications.feedback}
          />
          <JoinClassBanner
            homeContent={props.homeContent}
            handleJoinClassBannerClick={props.handleJoinClassBannerClick}
          />
          <ProfileBanner
            homeContent={props.homeContent}
            handleProfileBannerClick={props.handleProfileBannerClick}
            userDetails={props.userDetails}
            profilePicture={props.profilePicture}
          />
          {/* <HomeTileBanner
            displayContent={props.homeContent.banners.find(
              (el) => el.name === "paymentBanner"
            )}
            handleBannerClick={props.handlePaymentBannerClick}
            userRole={props.userDetails.role}
            notifications={props.notifications.payment}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default StudentHomeSection;
