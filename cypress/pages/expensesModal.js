import BasePage from '../pages/basePage'

class ExpensesModal extends BasePage {

    selectors = {
        modal: 'app-add-expense-modal',
        vehicle: '#addExpenseCar',
        date: '#addExpenseDate',
        mileage: '#addExpenseMileage',
        liters: '#addExpenseLiters',
        totalCost: '#addExpenseTotalCost',
        addButton: 'button.btn-primary',
        cancelButton: 'button.btn-secondary',
        error: '.alert-danger'
    }

    // ---- GETTERS ----

    getVehicle() {
        return this.getElementWithin(this.selectors.modal, this.selectors.vehicle)
    }

    getDateInput() {
        return this.getElementWithin(this.selectors.modal, this.selectors.date)
    }

    getMileageInput() {
        return this.getElementWithin(this.selectors.modal, this.selectors.mileage)
    }

    getLitersInput() {
        return this.getElementWithin(this.selectors.modal, this.selectors.liters)
    }

    getTotalCostInput() {
        return this.getElementWithin(this.selectors.modal, this.selectors.totalCost)
    }

    getAddButton() {
        return this.getElementWithin(this.selectors.modal, this.selectors.addButton)
    }

    getCancelButton() {
        return this.getElementWithin(this.selectors.modal, this.selectors.cancelButton)
    }

    getError() {
        return this.getElementWithin(this.selectors.modal, this.selectors.error)
    }

    getModal() {
        return this.getElement(this.selectors.modal)
    }

    // ---- ACTIONS ----

    selectVehicle(value) {
        this.selectWithin(this.selectors.modal, this.selectors.vehicle, value)
    }

    typeDate(value) {
        this.typeWithin(this.selectors.modal, this.selectors.date, value)
    }

    typeMileage(value) {
        this.typeWithin(this.selectors.modal, this.selectors.mileage, value)
    }

    typeLiters(value) {
        this.typeWithin(this.selectors.modal, this.selectors.liters, value)
    }

    typeTotalCost(value) {
        this.typeWithin(this.selectors.modal, this.selectors.totalCost, value)
    }

    clickAdd() {
        this.clickWithin(this.selectors.modal, this.selectors.addButton)
    }

    clickCancel() {
        this.clickWithin(this.selectors.modal, this.selectors.cancelButton)
    }
}

export default new ExpensesModal()