import BasePage from '../pages/basePage'
class LoginModal extends BasePage {

    selectors = {
        modal: 'app-signin-modal',
        modalTitle: '.modal-title',
        emailInput: '#signinEmail',
        passwordInput: '#signinPassword',
        loginButton: 'button.btn.btn-primary'
    }

    getEmailInput() {
        return this.getElement(this.selectors.emailInput);
    }

    typeEmail(email) {
        this.type(this.selectors.emailInput, email);
    }

    getPasswordInput() {
        return this.getElement(this.selectors.passwordInput);
    }

    typePassword(password) {
        this.type(this.selectors.passwordInput, password);
    }

    getLoginButton() {
        return this.getElementWithin(this.selectors.modal, this.selectors.loginButton)
    }

    clickLogin() {
        this.clickWithin(this.selectors.modal, this.selectors.loginButton)
    }

    login(user) {
        this.typeEmail(user.email);
        this.typePassword(user.password);
        this.clickLogin();
    }

}
export default new LoginModal();