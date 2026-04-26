class Header {
    //Header selectors
    headerContainer = '.header';
    headerLogo = 'a.header_logo';
    homeLink = 'a.header-link[href="/"]';
    aboutLink = 'button[appscrollto="aboutSection"]';
    contactsLink = 'button[appscrollto="contactsSection"]';
    guestLogIn = 'button.header-link.-guest';
    signIn = 'button.header_signin';
    signUp = 'button.hero-descriptor_btn';
    logInModal = 'app-signin-modal';
    registrationModal = 'app-signup-modal';

    getHeaderContainer() {
        return cy.get(this.headerContainer);
    }
    //Logo
    getHeaderLogo() {
        return cy.get(this.headerLogo);
    }
    clickHeaderLogo() {
        this.getHeaderLogo().click();
    }
    //homeLink 
    getHomeLink() {
        return cy.get(this.homeLink);
    }
    clickHomeLink() {
        this.getHomeLink().click();
    }
    //aboutLink
    getAboutLink() {
        return cy.get(this.aboutLink);
    }
    clickAboutLink() {
        this.getAboutLink().click();
    }
    //contactsLink
    getContactsLink() {
        return cy.get(this.contactsLink);
    }
    clickContactsLink() {
        this.getContactsLink().click();
    }
    //guestLogIn
    getGuestLogIn() {
        return cy.get(this.guestLogIn);
    }
    clickGuestLogIn() {
        this.getGuestLogIn().click();
    }
    //signIn
    getSignIn() {
        return cy.get(this.signIn);
    }
    clickSignIn() {
        this.getSignIn().click();
    }
    //SignUp
    getSignUp() {
        return cy.get(this.signUp);
    }
    clickSignUp() {
        this.getSignUp().click();
    }

    //LogIn modal container
    getLogInModal() {
        return cy.get(this.logInModal);
    }

    //LogIn modal container
    getRegistrationModal() {
        return cy.get(this.registrationModal);
    }
}
export default new Header();