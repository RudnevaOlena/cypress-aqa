import BasePage from './basePage'

class GaragePage extends BasePage {

    selectors = {
        addCarButton: '.btn-primary',

        // Add car modal 
        modal: 'app-add-car-modal',
        title: '.modal-title',
        closeButton: 'button[aria-label="Close"]',
        brandDropdown: '#addCarBrand',
        modelDropdown: '#addCarModel',
        mileageInputModal: '#addCarMileage',
        addButton: 'button.btn-primary',
        cancelButton: 'button.btn-secondary',
        validateErrorMileage: '.invalid-feedback',

        // Car list
        carList: '.car-list',
        carItem: '.car-item',
        carName: '.car_name',
        mileageInputCard: '.update-mileage-form_input',
        editButton: '.car_edit',

        // Edit car modal
        editModal: 'app-edit-car-modal',
        removeCarButton: '.btn-outline-danger',
        editModalCancelButton: '.btn-secondary',
        editModalSaveButton: '.btn-primary',

        // Remove car modal
        removeModal: 'app-remove-car-modal',
        removeConfirmButton: '.btn-danger'
    }

    // ---- GETTERS for Car List ----

    getMileageInputModal() {
        return this.getElementWithin(this.selectors.modal, this.selectors.mileageInputModal)
    }

    getAddButton() {
        return this.getElementWithin(this.selectors.modal, this.selectors.addButton)
    }

    getMileageError() {
        return this.getElementWithin(this.selectors.modal, this.selectors.validateErrorMileage)
    }

    getSelectedBrand() {
        return this.getSelectedOption(this.selectors.brandDropdown)
    }

    getSelectedModel() {
        return this.getSelectedOption(this.selectors.modelDropdown)
    }

    getCarByName(name) {
        return cy.contains(this.selectors.carName, name)
            .closest(this.selectors.carItem)
    }

    getCarMileageByName(name) {
        return this.getCarByName(name)
            .find(this.selectors.mileageInputCard)
    }

    getLatestCar() {
        return this.getElement(this.selectors.carItem).first()
    }

    getLatestCarName() {
        return this.getLatestCar().find(this.selectors.carName)
    }

    getLatestCarMileage() {
        return this.getLatestCar().find(this.selectors.mileageInputCard)
    }

    // ---- GETTERS for Edit Modal ----

    getEditModal() {
        return this.getElement(this.selectors.editModal)
    }

    getRemoveCarButton() {
        return this.getElementWithin(this.selectors.editModal, this.selectors.removeCarButton)
    }

    getEditModalCancelButton() {
        return this.getElementWithin(this.selectors.editModal, this.selectors.editModalCancelButton)
    }

    getEditModalSaveButton() {
        return this.getElementWithin(this.selectors.editModal, this.selectors.editModalSaveButton)
    }

    // ---- GETTERS for Remove Modal ----

    getRemoveModal() {
        return this.getElement(this.selectors.removeModal)
    }

    getRemoveConfirmButton() {
        return this.getElementWithin(this.selectors.removeModal, this.selectors.removeConfirmButton)
    }

    // ---- ACTIONS to Add Car ----

    openAddCarModal() {
        this.clickByText('button', 'Add car')
    }

    closeModal() {
        this.clickWithin(this.selectors.modal, this.selectors.closeButton)
    }

    selectBrand(brand) {
        this.selectWithin(this.selectors.modal, this.selectors.brandDropdown, brand)
    }

    selectModel(model) {
        this.selectWithin(this.selectors.modal, this.selectors.modelDropdown, model)
    }

    typeMileage(value) {
        this.typeWithin(this.selectors.modal, this.selectors.mileageInputModal, value)
    }

    clickAdd() {
        this.clickByTextWithin(this.selectors.modal, 'button', 'Add')
    }

    clickCancel() {
        this.clickByTextWithin(this.selectors.modal, 'button', 'Cancel')
    }

    getAddCarModal() {
        return this.getElement(this.selectors.modal)
    }

    getAllCarItems() {
        return this.getElement(this.selectors.carItem)
    }

    // ---- ACTIONS to Delete Car ----

    clickEditButtonOnLatestCar() {
        this.getLatestCar().find(this.selectors.editButton).click()
    }

    clickRemoveCarButton() {
        this.clickWithin(this.selectors.editModal, this.selectors.removeCarButton)
    }

    clickRemoveConfirmButton() {
        this.clickWithin(this.selectors.removeModal, this.selectors.removeConfirmButton)
    }

    clickEditModalCancel() {
        this.clickWithin(this.selectors.editModal, this.selectors.editModalCancelButton)
    }

    deleteLatestCar() {
        cy.get(this.selectors.carItem).should('have.length.greaterThan', 0)

        this.clickEditButtonOnLatestCar()
        cy.get(this.selectors.editModal).should('be.visible')
        this.clickRemoveCarButton()
        cy.get(this.selectors.removeModal).should('be.visible')
        this.clickRemoveConfirmButton()
        cy.get(this.selectors.removeModal).should('not.exist')
    }

    // ---- ASSERTIONS ----

    verifyModalVisible() {
        this.shouldBeVisible(this.selectors.modal)
    }

    verifyModalTitle() {
        this.shouldContainTextWithin(
            this.selectors.modal,
            this.selectors.title,
            'Add a car'
        )
    }

    verifyAllFieldsVisible() {
        this.shouldBeVisibleWithin(this.selectors.modal, this.selectors.brandDropdown)
        this.shouldBeVisibleWithin(this.selectors.modal, this.selectors.modelDropdown)
        this.shouldBeVisibleWithin(this.selectors.modal, this.selectors.mileageInputModal)
    }

    // ---- ACTIONS to Create a Car ----
    addCar(carData) {
        this.openAddCarModal()
        this.selectBrand(carData.brand)
        this.selectModel(carData.model)
        this.typeMileage(carData.mileage)
        this.clickAdd()
    }

    //---- Setup intercept for car creation ----
    setupCarInterception() {
        cy.intercept('POST', '**/api/cars').as('createCar')
    }

    //---- Wait for car creation and get ID ----
    waitForCarCreationAndGetId() {
        return cy.wait('@createCar').then((interception) => {
            expect(interception.response.statusCode).to.equal(201)
            const carId = interception.response.body.data.id
            return carId
        })
    }
    // ---- ACTIONS to Delete Car via API ----
    deleteAllCarsViaAPI() {
        return cy.getCarsViaAPI().then((response) => {
            const cars = response.body.data
            if (cars.length === 0) {
                cy.log('No cars to delete')
                return
            }

            cars.forEach((car) => {
                cy.request({
                    method: 'DELETE',
                    url: `${Cypress.config('baseUrl')}api/cars/${car.id}`
                }).then((deleteResponse) => {
                    if (deleteResponse.status === 200) {
                        cy.log(`Car ${car.id} deleted via API`)
                    }
                })
            })
        })
    }
}

export default new GaragePage()