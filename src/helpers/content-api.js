// "use strict";

let urlPathContent = require('../json/url-path.json');
let navBarContent = require('../json/navbar.json');
let syllabusContent = require('../json/syllabus.json');
let feedbackContent = require('../json/feedback.json');
let joinClassContent = require('../json/join-class.json');
let manageContent = require('../json/manage.json');
let registerContent = require('../json/register.json');
let loginContent = require('../json/login.json');
let profileContent = require('../json/profile.json');

let Api = {
    getUrlPathContent() {
        return urlPathContent;
    },
    getNavLinkContent(language = 'English') {
        return navBarContent.filter(obj => obj.language === language)[0];
    },
    getNavLinkPath(name) {
        return urlPathContent[name];
    },
    hasPageAccess(pageName, role, language = 'English') {
        return navBarContent.filter(obj => obj.language === language)[0].navLinks.filter(obj => obj.name === pageName)[0].availableFor.includes(role);
    },
    getSyllabusContent(language = 'English') {
        return syllabusContent.filter(obj => obj.language === language)[0];
    },
    getFeedbackContent(language = 'English') {
        return feedbackContent.filter(obj => obj.language === language)[0];
    },
    getJoinClassContent(language = 'English') {
        return joinClassContent.filter(obj => obj.language === language)[0];
    },
    getManageContent(language = 'English') {
        return manageContent.filter(obj => obj.language === language)[0];
    },
    getRegisterContent(language = 'English') {
        return registerContent.filter(obj => obj.language === language)[0];
    },
    getLoginContent(language = 'English') {
        return loginContent.filter(obj => obj.language === language)[0];
    },
    getProfileContent(language = 'English') {
        return profileContent.filter(obj => obj.language === language)[0];
    },

};

module.exports = Api;