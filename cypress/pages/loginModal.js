class LoginModal {

    selectors = {
        modalTitle: '.modal-title',
        emailInput: '#signinEmail',
        passwordInput: '#signinPassword',
        loginButton: 'button.btn.btn-primary'
    }

    getEmailInput() {
        return cy.get(this.selectors.emailInput);
    }

    typeEmail(email) {
        this.getEmailInput().clear().type(email);
    }

    getPasswordInput() {
        return cy.get(this.selectors.passwordInput);
    }

    typePassword(password) {
        this.getPasswordInput().clear().type(password);
    }

    getLoginButton() {
        return cy.get(this.selectors.loginButton);
    }

    clickLogin() {
        this.getLoginButton().click();
    }

    login(user) {
        this.typeEmail(user.email);
        this.typePassword(user.password);
        this.clickLogin();
    }

}

export default new LoginModal();