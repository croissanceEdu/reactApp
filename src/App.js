import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import Api from "./helpers/content-api";

import HomePage from "./components/pages/home.page";
import NavbarSection from "./components/sections/navbar.section";
import LoginPage from "./components/pages/login.page";
import ChangePasswordPage from "./components/pages/change-password.page";
import RegistrationPage from "./components/pages/registration.page";
import FooterSection from "./components/sections/footer.section";
import ProfilePage from "./components/pages/profile.page";
import ActivateAccountPage from "./components/pages/activate-account.page";
import JoinClassPage from "./components/pages/join-class.page";
import FeedbackPage from "./components/pages/feedback.page";
import SyllabusPage from "./components/pages/syllabus.page";
import ManagePage from "./components/pages/manage.page";
import RegisterTeacherPage from "./components/pages/register-teacher.page";
import ScreenOverlayExtra from "./components/extras/screen-overlay.extra";
import { loadNotifications } from "./helpers/api-call-helper";
import { isAuth } from "./helpers/auth";
import PaymentPage from "./components/pages/payment.page";
import PopupContainerExtra from "./components/extras/popup-container.extra";
import WarningPopup from "./components/popups/warning.popup";
import RecordPaymentPopup from "./components/popups/record-payment.popup";
import ApprovePaymentPopup from "./components/popups/approve-payment.popup";
import { userConnected } from "./helpers/websocket-helper";

function App() {
  // const browserlanguage = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
  let preferredLanguage = "English";
  // if (browserlanguage === "de-DE") {
  //   preferredLanguage = "German"
  // }
  // let languageStoredInLocalStorage = localStorage.getItem("language");
  // let [language, setLanguage] = useState(
  //   languageStoredInLocalStorage && languageStoredInLocalStorage != "undefined" ?
  //     languageStoredInLocalStorage : preferredLanguage
  // );
  let [language, setLanguage] = useState(preferredLanguage);

  const urlPathContent = Api.getUrlPathContent();
  const [userDetails, setUserDetails] = useState(isAuth());
  const [userShiftId, setUserShiftId] = useState("");
  const [selectedPage, setselectedPage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [notifications, setNotifications] = useState({
    feedback: [],
    activationLinks: [],
    syllabus: [],
    joinClass: [],
    payment: [],
  });
  const [hasPaymentUpdate, setHasPaymentUpdate] = useState(false)
  const [hasFeedbackUpdate, setHasFeedbackUpdate] = useState(false)
  const [overlayClassNames, setoverlayClassNames] = useState("");
  const [popupContainerClassNames, setPopupContainerClassNames] = useState("");
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupDetails, setPopupDetails] = useState({
    title: "",
    content: "",
    popupType: "",
    className: "",
    buttons: [],
    popupData: {}
  });
  const [navStyles, setNavStyles] = useState({
    navClassNames: "",
    navbarSectionClassNames: "navbar",
    navbarSectionScrollEffectClassNames: " ",
    isNavMenuOpen: false,
  });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const setNavVisible = (visiblity) => {
    if (visiblity) {
      setoverlayClassNames("overlay-visible");
      setNavStyles({
        ...navStyles,
        navClassNames: "nav-visible ",
        navbarSectionClassNames: "navbar nav-visible",
        isNavMenuOpen: true,
      });
    } else {
      setoverlayClassNames("");
      setNavStyles({
        ...navStyles,
        navClassNames: "",
        navbarSectionClassNames: "navbar",
        isNavMenuOpen: false,
      });
    }
  };
  const logoSizeToggle = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 10)
      setNavStyles({
        ...navStyles,
        navbarSectionScrollEffectClassNames: " navbar-short",
      });
    else
      setNavStyles({ ...navStyles, navbarSectionScrollEffectClassNames: " " });
  };
  // document.addEventListener("scroll", logoSizeToggle);

  const updateProfilePicture = (imagePath) => {
    if (imagePath) {
      if (profilePicture != `${process.env.REACT_APP_SERVER_URL}/${imagePath}` || true) {
        if (!profilePicture || true) {
          setProfilePicture(`${process.env.REACT_APP_SERVER_URL}/${imagePath}`);
        }
      }
    } else {
      if (profilePicture != `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`) {
        setProfilePicture(
          `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`
        );
      }
    }
  };
  const HandleUserShift = (data) => {
    setUserShiftId(data._id);
  };
  const HandleSetOnlineUsers = (data) => {
    let ids = data.map((el) => el._id);
    setOnlineUsers(ids);
  };
  const handlePaymentUpdate = () => {
    setHasPaymentUpdate(true);
  }
  const handleFeedbackUpdate = () => {
    setHasFeedbackUpdate(true);
  }
  const notify = () => {
    // console.log("notify")
    if (userDetails)
      loadNotifications(
        userDetails._id,
        userDetails.role,
        setNotifications,
        updateProfilePicture
      );
  };

  useEffect(() => {
    if (userDetails) {
      userConnected(userDetails, notify, HandleSetOnlineUsers, HandleUserShift, handlePaymentUpdate, handleFeedbackUpdate)
    }
  }, []);

  const popupFunctions = {
    showWarningPopup(title, content, className, buttons) {
      setPopupDetails({ title, content, popupType: "warning", className, buttons, popupData: {} });
      setPopupVisibility(true);
      setTimeout(() => {
        setPopupContainerClassNames("overlay-visible");
      }, 10);
    },
    showRecordPaymentPopup(title, content, className, buttons, popupData) {
      setPopupDetails({ title, content, popupType: "record-payment", className, buttons, popupData });
      setPopupVisibility(true);
      setTimeout(() => {
        setPopupContainerClassNames("overlay-visible");
      }, 10);
    }, showApprovePaymentRequestPopup(title, content, className, buttons, popupData) {
      setPopupDetails({ title, content, popupType: "approve-payment", className, buttons, popupData });
      setPopupVisibility(true);
      setTimeout(() => {
        setPopupContainerClassNames("overlay-visible");
      }, 10);
    },
    getPopupData() { return popupDetails.popupData; },
    setPopupData(popupData) { setPopupDetails({ ...popupDetails, popupData }) },
    closePopup() {
      setPopupContainerClassNames("closing");
      setTimeout(() => {
        setPopupContainerClassNames("");
        setPopupVisibility(false);
        setPopupDetails({ title: "", content: "", popupType: "", className: "", buttons: [], popupData: {} });
      }, 1000);
    },
  };
  const displayPopup = () => {
    switch (popupDetails.popupType) {
      case "warning":
        return (<WarningPopup
          popupContainerClassNames={popupContainerClassNames}
          popupDetails={popupDetails}
          popupFunctions={popupFunctions}
        />);
      case "record-payment":
        return (<RecordPaymentPopup
          popupContainerClassNames={popupContainerClassNames}
          popupDetails={popupDetails}
          popupFunctions={popupFunctions}
        />);
      case "approve-payment":
        return (<ApprovePaymentPopup
          popupContainerClassNames={popupContainerClassNames}
          popupDetails={popupDetails}
          popupFunctions={popupFunctions}
        />);
      default:
        return null;
    }
  }
  // document.onscroll = popupFunctions.closePopup; //uncomment if popup need to exit on scroll
  // window.addEventListener("resize", () => {  setNavVisible(false) })
  return (
    <Router>
      <ScreenOverlayExtra
        overlayClassNames={overlayClassNames}
        setNavVisible={setNavVisible}
      />
      {popupVisibility && (
        <>
          <PopupContainerExtra
            popupFunctions={popupFunctions}
            popupContainerClassNames={popupContainerClassNames}
          />
          {displayPopup()}
        </>
      )}
      <Route
        path={[
          urlPathContent.homePage,
          urlPathContent.changePasswordPage,
          urlPathContent.profilePage,
          urlPathContent.activateAccountPage,
          urlPathContent.joinClassPage,
          urlPathContent.feedbackPage,
          urlPathContent.syllabusPage,
          urlPathContent.managePage,
          urlPathContent.paymentPage,
        ]}
        exact
        render={(props) => (
          <NavbarSection
            {...props}
            language={language}
            setLanguage={setLanguage}
            selectedPage={selectedPage}
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            setoverlayClassNames={setoverlayClassNames}
            setNavVisible={setNavVisible}
            navStyles={navStyles}
            notifications={notifications}
            userDetails={userDetails}
          />
        )}
      />

      <Switch>
        <Route
          path={urlPathContent.loginPage}
          exact
          render={(props) => (
            <LoginPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
            />
          )}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <Route
          path={urlPathContent.registerTeacherPage}
          exact
          render={(props) => (
            <RegisterTeacherPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              userDetails={userDetails}
            />
          )}
        />
        <Route
          path={urlPathContent.registerPage}
          exact
          render={(props) => (
            <RegistrationPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              userDetails={userDetails}
            />
          )}
        />

        <Route
          path={urlPathContent.homePage}
          exact
          render={(props) => (
            <HomePage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
              notifications={notifications}
              profilePicture={profilePicture}
            />
          )}
        />
        <Route
          path={urlPathContent.changePasswordPage}
          exact
          render={(props) => (
            <ChangePasswordPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
            />
          )}
        />
        <Route
          path={urlPathContent.profilePage}
          exact
          render={(props) => (
            <ProfilePage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          )}
        />
        <Route
          path={urlPathContent.activateAccountPage}
          exact
          render={(props) => (
            <ActivateAccountPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
            />
          )}
        />
        <Route
          path={urlPathContent.joinClassPage}
          exact
          render={(props) => (
            <JoinClassPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
            />
          )}
        />
        <Route
          path={urlPathContent.feedbackPage}
          exact
          render={(props) => (
            <FeedbackPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              notifications={notifications}
              notify={notify}
              userDetails={userDetails}
              onlineUsers={onlineUsers}
              hasFeedbackUpdate={hasFeedbackUpdate}
              setHasFeedbackUpdate={(hasUpdate) => setHasFeedbackUpdate(hasUpdate)}
            />
          )}
        />
        <Route
          path={urlPathContent.syllabusPage}
          exact
          render={(props) => (
            <SyllabusPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              notifications={notifications}
              notify={notify}
              userDetails={userDetails}
              popupFunctions={popupFunctions}
              onlineUsers={onlineUsers}
            />
          )}
        />
        <Route
          path={urlPathContent.managePage}
          exact
          render={(props) => (
            <ManagePage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              userDetails={userDetails}
              setUserDetails={setUserDetails}
              popupFunctions={popupFunctions}
              onlineUsers={onlineUsers}
            />
          )}
        />
        <Route
          path={urlPathContent.paymentPage}
          exact
          render={(props) => (
            <PaymentPage
              {...props}
              language={language}
              urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess}
              setselectedPage={setselectedPage}
              notifications={notifications}
              notify={notify}
              userDetails={userDetails}
              popupFunctions={popupFunctions}
              onlineUsers={onlineUsers}
              userShiftId={userShiftId}
              hasPaymentUpdate={hasPaymentUpdate}
              setHasPaymentUpdate={(hasUpdate) => setHasPaymentUpdate(hasUpdate)}
            />
          )}
        />
      </Switch>
      <Route
        path={[
          urlPathContent.homePage,
          urlPathContent.changePasswordPage,
          urlPathContent.profilePage,
          urlPathContent.activateAccountPage,
          urlPathContent.joinClassPage,
          urlPathContent.feedbackPage,
          urlPathContent.syllabusPage,
          urlPathContent.managePage,
          urlPathContent.paymentPage,
        ]}
        exact
        render={(props) => <FooterSection {...props} language={language} />}
      />
    </Router>
  );
}

export default App;
