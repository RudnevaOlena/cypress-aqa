class SigUp {

    selectors = {
        signUpFormTitle: '.modal-title',
        userNameInput: '#signupName',
        userLastnameInput: '#signupLastName',
        userEmail: '#signupEmail',
        userPassword: '#signupPassword',
        userReEnterPassword: '#signupRepeatPassword',
        registerButton: 'app-signup-modal .modal-footer button.btn-primary',
        crossIcon: 'app-signup-modal button[aria-label="Close"]',
        userProfileButton: '#userNavDropdown'
    }

    getFormError(inputName) {
        return cy.get(`[formcontrolname="${inputName}"]`)
            .closest('.form-group')
            .find('.invalid-feedback')
    }

    //Name
    getNameInput() {
        return cy.get(this.selectors.userNameInput)
    }
    typeName(name) {
        this.getNameInput().clear().type(name)
    }
    //Last Name
    getLastNameInput() {
        return cy.get(this.selectors.userLastnameInput)
    }
    typeLastName(lastName) {
        this.getLastNameInput().clear().type(lastName)
    }
    //Email
    getEmailInput() {
        return cy.get(this.selectors.userEmail)
    }
    typeEmail(email) {
        this.getEmailInput().clear().type(email)
    }
    //Password
    getPasswordInput() {
        return cy.get(this.selectors.userPassword)
    }
    typePassword(password) {
        this.getPasswordInput().clear().type(password)
    }
    //Re-enter Password
    getRepeatPasswordInput() {
        return cy.get(this.selectors.userReEnterPassword)
    }
    typeRepeatPassword(password) {
        this.getRepeatPasswordInput().clear().type(password)
    }
    //Register button
    getRegisterButton() {
        return cy.get(this.selectors.registerButton)
    }
    clickRegister() {
        this.getRegisterButton().click()
    }
    //Close button
    getCloseButton() {
        return cy.get(this.selectors.crossIcon)
    }
    clickClose() {
        this.getCloseButton().click()
    }

    //get Profile button
    getUserProfileButton() {
        return cy.get(this.selectors.userProfileButton)
    }

    //Get Errors
    getsignUpFormTitle() {
        return cy.get(this.selectors.signUpFormTitle)
    }

    //Register logic
    register(user) {
        this.typeName(user.name)
        this.typeLastName(user.lastName)
        this.typeEmail(user.email)
        this.typePassword(user.password)
        this.typeRepeatPassword(user.password)
        this.clickRegister()
    }

    isSignUpFormVisible() {
        cy.get('app-signup-modal').should('be.visible')
        this.getsignUpFormTitle().should('be.visible').and('contain', 'Registration')
        this.getNameInput().should('be.visible')
        this.getLastNameInput().should('be.visible')
        this.getEmailInput().should('be.visible')
        this.getPasswordInput().should('be.visible')
        this.getRepeatPasswordInput().should('be.visible')
        this.getRegisterButton().should('be.visible')
        this.getCloseButton().should('be.visible')
    }


}
export default new SigUp();