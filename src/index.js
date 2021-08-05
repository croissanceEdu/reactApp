import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';



import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import "./css/font.css";


// import HomePage from './components/pages/home.page';
// import NavbarSection from './components/sections/navbar.section';
// import LoginPage from './components/pages/login.page';
// import { isAuth } from './helpers/auth';

// import Api from './helpers/content-api';

import App from './App';

// import BackdropExtra from './components/extras/backdrop.extra';


require('dotenv').config();



ReactDOM.render(
  <React.StrictMode>
    <ToastContainer></ToastContainer>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// let language = "English";

// let urlPathContent = Api.getUrlPathContent(language);


// if (!isAuth())
//   ReactDOM.render(
//     <Router>
//       <ToastContainer></ToastContainer>
//       <Redirect to={urlPathContent.loginPage} />
//       <Route path={urlPathContent.loginPage} exact render={props => <LoginPage {...props} language={language} toast={toast} />} />
//     </Router>,
//     document.getElementById('root')
//   )

// else
//   ReactDOM.render(
//     <Router>
//       <ToastContainer></ToastContainer>

//       <Route path={urlPathContent.homePage} render={props => <NavbarSection  {...props} language={language} toast={toast} />} />

//       <Switch>

//         <Route path={urlPathContent.homePage} exact render={props => <HomePage {...props} language={language} toast={toast} />} />
//         <Route path={urlPathContent.loginPage} exact render={props => <LoginPage {...props} language={language} toast={toast} />} />

//       </Switch>
//     </Router>,
//     document.getElementById('root')
//   );
