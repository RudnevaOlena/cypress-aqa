import header from '../../pages/header'

describe('Header elements and Sign Up', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: Cypress.env('username'),
        password: Cypress.env('password')
      }
    })
  })

  it('Check header elements are visible and their names', () => {
    header.getHeaderLogo().should('be.visible').and('exist');
    header.getHomeLink().should('be.visible').and('contain', 'Home');
    header.getAboutLink().should('be.visible').and('contain', 'About');
    header.getContactsLink().should('be.visible').and('contain', 'Contacts');
    header.getGuestLogIn().should('be.visible').and('contain', 'Guest log in');
    header.getSignUp().should('be.visible').and('contain', 'Sign up');
  })

  it('Check that Home is active by default', () => {
    header.getHomeLink().should('be.visible').and('have.class', '-active');
  })
  
  it('Check redirection from Guest log in', () => {
    header.clickGuestLogIn();
    cy.url().should('include', '/panel/garage');
  })

  it('Check login modal opening after clicking Sign In', () => {
    header.clickSignIn();
    header.getLogInModal().should('be.visible');
  })

  it('Check Registration modal opening after clicking Sign Up', () => {
    header.clickSignUp();
    header.getRegistrationModal().should('be.visible');
  })
})