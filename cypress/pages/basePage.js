class BasePage {
    getElement(selector) {
        return cy.get(selector);
    }

    click(selector) {
        this.getElement(selector)
            .should('be.visible')
            .click();
    }

    type(selector, text) {
        this.getElement(selector)
            .should('be.visible')
            .clear()
            .type(text);
    }

    shouldBeVisible(selector) {
        this.getElement(selector)
            .should('be.visible');
    }

    shouldContainText(selector, text) {
        this.getElement(selector)
            .should('be.visible')
            .and('contain.text', text);
    }

    getElementWithin(parent, child) {
        return cy.get(parent).find(child);
    }

    clickWithin(parent, child) {
        this.getElementWithin(parent, child)
            .should('be.visible')
            .click();
    }

    typeWithin(parent, child, text) {
        this.getElementWithin(parent, child)
            .should('be.visible')
            .clear()
            .type(text);
    }

    selectWithin(parent, child, value) {
        this.getElementWithin(parent, child)
            .should('be.visible')
            .select(value);
    }

    shouldBeVisibleWithin(parent, child) {
        this.getElementWithin(parent, child).should('be.visible');
    }

    shouldContainTextWithin(parent, child, text) {
        this.getElementWithin(parent, child)
            .should('be.visible')
            .and('contain.text', text);
    }

    clickByText(selector, text) {
        cy.contains(selector, text)
            .should('be.visible')
            .click();
    }

    clickByTextWithin(parent, selector, text) {
        cy.get(parent)
            .contains(selector, text)
            .should('be.visible')
            .click();
    }

    getSelectedOption(selector) {
        return this.getElement(`${selector} option:selected`)
    }

    blur(selector) {
        this.getElement(selector).blur()
    }
}
export default BasePage;