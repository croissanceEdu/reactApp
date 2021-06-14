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
  const [userDetails, setUserDetails] = useState(isAuth())
  const [selectedPage, setselectedPage] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)
  const [notifications, setNotifications] = useState({ feedback: [], activationLinks: [], syllabus: [], joinClass: [], payment: [] })
  const [overlayClassNames, setoverlayClassNames] = useState("")
  const [navStyles, setNavStyles] = useState({
    navClassNames: "",
    navbarSectionClassNames: "navbar",
    navbarSectionScrollEffectClassNames: " ",
    isNavMenuOpen: false
  });

  const setNavVisible = (visiblity) => {
    if (visiblity) {
      setoverlayClassNames("overlay-visible");
      setNavStyles({
        ...navStyles,
        navClassNames: "nav-visible ",
        navbarSectionClassNames: "navbar nav-visible",
        isNavMenuOpen: true
      });
    } else {
      setoverlayClassNames("");
      setNavStyles({
        ...navStyles,
        navClassNames: "",
        navbarSectionClassNames: "navbar",
        isNavMenuOpen: false
      });
    }
  };
  const logoSizeToggle = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 10)
      setNavStyles({ ...navStyles, navbarSectionScrollEffectClassNames: " navbar-short" })
    else setNavStyles({ ...navStyles, navbarSectionScrollEffectClassNames: " " })
  }
  // document.addEventListener("scroll", logoSizeToggle);


  const updateProfilePicture = (imagePath) => {
    if (imagePath) {
      if (!profilePicture)
        setProfilePicture(
          `${process.env.REACT_APP_SERVER_URL}/${imagePath}`
        );
    } else
      setProfilePicture(
        `${process.env.REACT_APP_SERVER_URL}/${process.env.REACT_APP_DEFAULT_PROFILE_PIC}`
      );
  };
  const notify = () => { if (userDetails) loadNotifications(userDetails._id, userDetails.role, setNotifications, updateProfilePicture) }
  useEffect(() => {
    notify();
  }, [])
  return (
    <Router>  <ScreenOverlayExtra overlayClassNames={overlayClassNames} setNavVisible={setNavVisible} />
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
          urlPathContent.paymentPage
        ]}
        exact
        render={(props) => <NavbarSection {...props} language={language} setLanguage={setLanguage} selectedPage={selectedPage}
          profilePicture={profilePicture} setProfilePicture={setProfilePicture}
          setoverlayClassNames={setoverlayClassNames} setNavVisible={setNavVisible} navStyles={navStyles}
          notifications={notifications}
          userDetails={userDetails}
        />}
      />

      <Switch>
        <Route
          path={urlPathContent.loginPage}
          exact
          render={(props) => <LoginPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} />}
          userDetails={userDetails} setUserDetails={setUserDetails} />
        <Route
          path={urlPathContent.registerTeacherPage}
          exact
          render={(props) => (
            <RegisterTeacherPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess}
              userDetails={userDetails} />
          )}
        />
        <Route
          path={urlPathContent.registerPage}
          exact
          render={(props) => (
            <RegistrationPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess}
              userDetails={userDetails} />
          )}
        />

        <Route
          path={urlPathContent.homePage}
          exact
          render={(props) => <HomePage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            userDetails={userDetails} notifications={notifications}
            profilePicture={profilePicture} />}
        />
        <Route
          path={urlPathContent.changePasswordPage}
          exact
          render={(props) => (
            <ChangePasswordPage {...props} language={language} urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
              userDetails={userDetails} />
          )}
        />
        <Route
          path={urlPathContent.profilePage}
          exact
          render={(props) => <ProfilePage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} profilePicture={profilePicture}
            setProfilePicture={setProfilePicture} setselectedPage={setselectedPage}
            userDetails={userDetails} setUserDetails={setUserDetails} />}
        />
        <Route
          path={urlPathContent.activateAccountPage}
          exact
          render={(props) => (
            <ActivateAccountPage {...props} language={language} urlPathContent={urlPathContent}
              hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
              userDetails={userDetails} />
          )}
        />
        <Route
          path={urlPathContent.joinClassPage}
          exact
          render={(props) => <JoinClassPage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            userDetails={userDetails} />}
        />
        <Route
          path={urlPathContent.feedbackPage}
          exact
          render={(props) => <FeedbackPage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            notifications={notifications} notify={notify}
            userDetails={userDetails} />}
        />
        <Route
          path={urlPathContent.syllabusPage}
          exact
          render={(props) => <SyllabusPage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            notifications={notifications} notify={notify}
            userDetails={userDetails} />}
        />
        <Route
          path={urlPathContent.managePage}
          exact
          render={(props) => <ManagePage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            userDetails={userDetails} setUserDetails={setUserDetails} />}
        />
        <Route
          path={urlPathContent.paymentPage}
          exact
          render={(props) => <PaymentPage {...props} language={language} urlPathContent={urlPathContent}
            hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage}
            notifications={notifications} notify={notify}
            userDetails={userDetails} />}
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
          urlPathContent.paymentPage
        ]}
        exact
        render={(props) => <FooterSection {...props} language={language} />}
      />
    </Router>
  );
}

export default App;
