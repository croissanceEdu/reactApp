import React, { useState } from "react";
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
  const [selectedPage, setselectedPage] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

  return (
    <Router>
      <Route
        path={[
          urlPathContent.homePage,
          urlPathContent.changePasswordPage,
          urlPathContent.profilePage,
          urlPathContent.activateAccountPage,
          urlPathContent.joinClassPage,
          urlPathContent.feedbackPage,
          urlPathContent.syllabusPage,
          urlPathContent.managePage
        ]}
        exact
        render={(props) => <NavbarSection {...props} language={language} setLanguage={setLanguage} selectedPage={selectedPage} profilePicture={profilePicture} setProfilePicture={setProfilePicture} />}
      />

      <Switch>
        <Route
          path={urlPathContent.loginPage}
          exact
          render={(props) => <LoginPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} />}
        />
        <Route
          path={urlPathContent.registerTeacherPage}
          exact
          render={(props) => (
            <RegisterTeacherPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} />
          )}
        />
        <Route
          path={urlPathContent.registerPage}
          exact
          render={(props) => (
            <RegistrationPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} />
          )}
        />

        <Route
          path={urlPathContent.homePage}
          exact
          render={(props) => <HomePage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />}
        />
        <Route
          path={urlPathContent.changePasswordPage}
          exact
          render={(props) => (
            <ChangePasswordPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />
          )}
        />
        <Route
          path={urlPathContent.profilePage}
          exact
          render={(props) => <ProfilePage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} profilePicture={profilePicture} setProfilePicture={setProfilePicture} setselectedPage={setselectedPage} />}
        />
        <Route
          path={urlPathContent.activateAccountPage}
          exact
          render={(props) => (
            <ActivateAccountPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />
          )}
        />
        <Route
          path={urlPathContent.joinClassPage}
          exact
          render={(props) => <JoinClassPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />}
        />
        <Route
          path={urlPathContent.feedbackPage}
          exact
          render={(props) => <FeedbackPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />}
        />
        <Route
          path={urlPathContent.syllabusPage}
          exact
          render={(props) => <SyllabusPage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />}
        />
        <Route
          path={urlPathContent.managePage}
          exact
          render={(props) => <ManagePage {...props} language={language} urlPathContent={urlPathContent} hasPageAccess={Api.hasPageAccess} setselectedPage={setselectedPage} />}
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
          urlPathContent.managePage
        ]}
        exact
        render={(props) => <FooterSection {...props} language={language} />}
      />
    </Router>
  );
}

export default App;
