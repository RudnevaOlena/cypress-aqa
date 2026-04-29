import footer from '../../pages/footer'

describe('Footer elements', () => {
  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: Cypress.env('usernamePage'),
        password: Cypress.env('passwordPage')
      }
    })
  })

  it('Check footer elements are visible', () => {
    footer.getFacebookIcon().should('be.visible');
    footer.getTelegramIcon().should('be.visible');
    footer.getYouTubeIcon().should('be.visible');
    footer.getInstagramIcon().should('be.visible');
    footer.getLinkedinIcon().should('be.visible');
    footer.getItHillelLink().should('be.visible');
    footer.getSupportMail().should('be.visible');
  })
  
  it('Check FacebookIcon link', () => {
    footer.getFacebookIcon().should('have.attr', 'href')
    .and('include', 'facebook.com/Hillel.IT.School');
  })
  it('Check TelegramIcon link', () => {
    footer.getTelegramIcon().should('have.attr', 'href')
    .and('include', 't.me/ithillel_kyiv');
  })
  it('Check YouTubeIcon link', () => {
    footer.getYouTubeIcon().should('have.attr', 'href')
    .and('include', 'youtube.com/user/HillelITSchool');
  })
  it('Check InstagramIcon link', () => {
    footer.getInstagramIcon().should('have.attr', 'href')
    .and('include', 'instagram.com/hillel_itschool/');
  })
  it('Check LinkedinIcon link', () => {
    footer.getLinkedinIcon().should('have.attr', 'href')
    .and('include', 'linkedin.com/school/ithillel/');
  })

  it('Check ithillel.ua link', () => {
    footer.getItHillelLink().should('have.attr', 'href')
    .and('include', 'ithillel.ua');
  })

  it('Check support mail link', () => {
    footer.getSupportMail().should('have.attr', 'href', 'mailto:developer@ithillel.ua');
  })

})