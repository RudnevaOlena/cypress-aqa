import garage from '../../pages/garagePage'
import expensesPage from '../../pages/expensesPage'
import expensesModal from '../../pages/expensesModal'
import expensesListComponent from '../../pages/expensesListComponent'
import header from '../../pages/header'
import loginModal from '../../pages/loginModal'

describe('Add Expense', () => {

    beforeEach(() => {
        cy.openApp()

        cy.getLoginCredentials().then((creds) => {
            //cy.log(`Using: ${creds.environment}`)
            header.clickSignIn()
            loginModal.login({
                email: creds.email,
                password: creds.password
            })
        })
        cy.url().should('include', '/panel/garage')
    })

    it('Should show error if mileage not updated', () => {
        cy.fixture('expensesData').then((data) => {
            // Add car
            garage.openAddCarModal()
            garage.typeMileage(data.defaultCar.mileage)
            garage.clickAdd()

            // Go to expenses
            expensesPage.openExpensesPage()
            expensesPage.openAddExpenseModal()

            // Fill only liters and total cost (don't update mileage)
            expensesModal.typeLiters(data.expense.liters)
            expensesModal.typeTotalCost(data.expense.totalCost)
            expensesModal.clickAdd()

            // Verify error message
            expensesModal.getError()
                .should('be.visible')
                .then(($error) => {
                    expect($error.text()).to.include('must not be less or equal')
                })
        })
    })

    it('Should successfully add expense with updated mileage', () => {
        cy.fixture('expensesData').then((data) => {
            // Add car
            garage.openAddCarModal()
            garage.typeMileage(data.defaultCar.mileage)
            garage.clickAdd()

            // Go to expenses
            expensesPage.openExpensesPage()
            expensesPage.openAddExpenseModal()

            // Update mileage 
            expensesModal.typeMileage(data.expense.newMileage)
            expensesModal.typeLiters(data.expense.liters)
            expensesModal.typeTotalCost(data.expense.totalCost)
            expensesModal.clickAdd()

            // Modal should close after success
            expensesPage.modal.getModal().should('not.exist')

            // Verify expense in table
            expensesListComponent.verifyLatestExpense(
                data.expense.newMileage,
                data.expense.liters,
                data.expense.totalCost
            )
        })
    })

    it('Should auto-fill vehicle with latest car', () => {
        cy.fixture('expensesData').then((data) => {
            garage.openAddCarModal()
            garage.typeMileage(data.defaultCar.mileage)
            garage.clickAdd()

            expensesPage.openExpensesPage()
            expensesPage.openAddExpenseModal()

            // Verify vehicle is selected
            expensesModal.getVehicle()
                .should('be.visible')
                .should('not.have.value', '')

            expensesModal.clickCancel()
            expensesPage.modal.getModal().should('not.exist')
        })
    })

    it('Should cancel adding expense', () => {
        cy.fixture('expensesData').then((data) => {
            garage.openAddCarModal()
            garage.typeMileage(data.defaultCar.mileage)
            garage.clickAdd()

            expensesPage.openExpensesPage()
            expensesPage.openAddExpenseModal()

            expensesModal.typeLiters(data.expense.liters)
            expensesModal.clickCancel()

            // Modal should close
            expensesPage.modal.getModal().should('not.exist')
        })
    })
})