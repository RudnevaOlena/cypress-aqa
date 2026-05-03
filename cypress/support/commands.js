Cypress.Commands.add('openApp', () => {
  cy.visit('/', {
    auth: {
      username: Cypress.env('usernamePage'),
      password: Cypress.env('passwordPage')
    }
  })
}); 

Cypress.Commands.add('login', (user) => {
  header.clickSignIn();
  loginModal.typeEmail(user.email);
  loginModal.typePassword(user.password);
  loginModal.clickLogin();
});
