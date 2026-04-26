class Footer {
    //Footer selectors
    facebookIcon = 'a.socials_link[href*="facebook.com"]';
    telegramIcon = 'a.socials_link[href*="t.me';
    youTubeIcon = 'a.socials_link[href*="youtube.com"]';
    instagramIcon = 'a.socials_link[href*="instagram.com';
    linkedinIcon = 'a.socials_link[href*="linkedin.com';
    itHillelLink = '.contacts_link[href="https://ithillel.ua"]';
    supportMail = '.contacts_link[href="mailto:developer@ithillel.ua"]';

    //Facebook
    getFacebookIcon() {
        return cy.get(this.facebookIcon);
    }
    clickFacebookIcon() {
        this.getFacebookIcon().click();
    }

    //Telegram
    getTelegramIcon() {
        return cy.get(this.telegramIcon);
    }
    clickTelegramIcon() {
        this.getTelegramIcon().click();
    }
    //YouTube 
    getYouTubeIcon() {
        return cy.get(this.youTubeIcon);
    }
    clickYouTubeIcon() {
        this.getYouTubeIcon().click();
    }
    //Instagram
    getInstagramIcon() {
        return cy.get(this.instagramIcon);
    }
    clickInstagramIcon() {
        this.getInstagramIcon().click();
    }
    //LinkedIn
    getLinkedinIcon() {
        return cy.get(this.linkedinIcon);
    }
    clickLinkedinIcon() {
        this.getLinkedinIcon().click();
    }

    //itHillelLink
    getItHillelLink() {
        return cy.get(this.itHillelLink);
    }
    clickItHillelLink() {
        this.getItHillelLink().click();
    }
    //supportMail
    getSupportMail() {
        return cy.get(this.supportMail);
    }
    clickGetSupportMail() {
        this.getSupportMail().click();
    }
}
export default new Footer();