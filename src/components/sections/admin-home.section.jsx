import ActivateAccountBanner from "../banners/activate-account.banner";
import HomeTileBanner from "../banners/home-tile.banner";
import ManageBanner from "../banners/manage.banner";
import ProfileBanner from "../banners/profile.banner";
import SyllabusBanner from "../banners/syllabus.banner";
import WelcomeBanner from "../banners/welcome.banner";

const AdminHomeSection = (props) => {
  return (
    <section className="home-section ">
      <div className="navbar-spacer"></div>
      <div className="home-main-block">
        <WelcomeBanner
          homeContent={props.homeContent}
          userDetails={props.userDetails}
        />
        <div className="banners-block container">
          <SyllabusBanner
            homeContent={props.homeContent}
            handleSyllabusBannerClick={props.handleSyllabusBannerClick}
          />
          <ManageBanner
            homeContent={props.homeContent}
            handleManageBannerClick={props.handleManageBannerClick}
          />
          <ActivateAccountBanner
            homeContent={props.homeContent}
            handleActivateAccountBannerClick={
              props.handleActivateAccountBannerClick
            }
            notifications={props.notifications.activationLinks}
          />
          <ProfileBanner
            homeContent={props.homeContent}
            handleProfileBannerClick={props.handleProfileBannerClick}
            userDetails={props.userDetails}
            profilePicture={props.profilePicture}
          />
          <HomeTileBanner
            displayContent={props.homeContent.banners.find(
              (el) => el.name === "paymentBanner"
            )}
            handleBannerClick={props.handlePaymentBannerClick}
            userRole={props.userDetails.role}
            notifications={props.notifications.payment}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminHomeSection;
