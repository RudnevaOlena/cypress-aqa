import BasePage from '../pages/basePage'

class ExpenseListComponent extends BasePage {

    selectors = {
        table: '.expenses_table',
        tableBody: '.expenses_table tbody',
        rows: '.expenses_table tbody tr',
        dateCell: 'td:nth-child(1)',
        mileageCell: 'td:nth-child(2)',
        litersCell: 'td:nth-child(3)',
        totalCostCell: 'td:nth-child(4)',
        actionCell: 'td:nth-child(5)',
        deleteButton: '.btn-delete',
        editButton: '.btn-edit'
    }

    // ---- GETTERS ----

    getTable() {
        return this.getElement(this.selectors.table)
    }

    getAllRows() {
        return this.getElement(this.selectors.rows)
    }

    getLatestRow() {
        return this.getAllRows().first()
    }

    getLatestDate() {
        return this.getLatestRow().find(this.selectors.dateCell)
    }

    getLatestMileage() {
        return this.getLatestRow().find(this.selectors.mileageCell)
    }

    getLatestLiters() {
        return this.getLatestRow().find(this.selectors.litersCell)
    }

    getLatestTotalCost() {
        return this.getLatestRow().find(this.selectors.totalCostCell)
    }

    getLatestDeleteButton() {
        return this.getLatestRow().find(this.selectors.deleteButton)
    }

    getLatestEditButton() {
        return this.getLatestRow().find(this.selectors.editButton)
    }

    // ---- ACTIONS ----

    clickDeleteOnLatestExpense() {
        this.getLatestDeleteButton().click()
    }

    clickEditOnLatestExpense() {
        this.getLatestEditButton().click()
    }

    // ---- ASSERTIONS ----

    verifyLatestExpense(mileage, liters, totalCost) {
        this.getLatestMileage()
            .should('contain', mileage)

        this.getLatestLiters()
            .should('contain', liters)

        this.getLatestTotalCost()
            .should('contain', totalCost)
    }

    verifyTableIsVisible() {
        this.getTable().should('be.visible')
    }

    verifyExpenseExists(mileage, liters, totalCost) {
        this.getTable().should('be.visible')
        cy.contains(this.selectors.rows, String(mileage))
            .and('contain', String(liters))
            .and('contain', String(totalCost))
    }
}

export default new ExpenseListComponent()