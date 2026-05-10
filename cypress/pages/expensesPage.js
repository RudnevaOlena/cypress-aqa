
import BasePage from '../pages/basePage'
import sideMenu from '../pages/sideMenu'
import expensesModal from '../pages/expensesModal'
import expensesListComponent from '../pages/expensesListComponent'

class ExpensesPage extends BasePage {

    selectors = {
        addExpenseButton: '.btn-primary'
    }

    sideMenu = sideMenu
    modal = expensesModal
    list = expensesListComponent

    // ---- GETTERS ----

    getAddExpenseButton() {
        return this.getElement(this.selectors.addExpenseButton)
    }

    // ---- ACTIONS ----

    openExpensesPage() {
        this.sideMenu.clickExpenses()
        cy.url().should('include', '/panel/expenses')
    }

    openAddExpenseModal() {
        this.getAddExpenseButton()
            .should('be.visible')
            .click()
        this.modal.getModal().should('be.visible')
    }
}

export default new ExpensesPage()