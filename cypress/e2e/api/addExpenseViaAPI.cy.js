import garage from '../../pages/garagePage'
import expensesPage from '../../pages/expensesPage'
import expensesListComponent from '../../pages/expensesListComponent'

describe('Add Expense Via API', () => {

    let createdCarId

    beforeEach(() => {
        cy.getLoginCredentials().then((creds) => {
            cy.loginAndSaveSid(creds.email, creds.password)
        })
        cy.openApp()
        cy.url().should('include', '/panel/garage')
    })

    it('T1: Should intercept car creation, validate status 201 and save car ID', () => {
        cy.fixture('expensesData').then((data) => {
            garage.setupCarInterception()
            garage.addCar(data.defaultCar)
            garage.waitForCarCreationAndGetId().then((carId) => {
                createdCarId = carId
                cy.log(`Car ID = ${createdCarId}`)
                expect(createdCarId).to.exist
                expect(createdCarId).to.be.a('number')
                expect(createdCarId).to.be.greaterThan(0)
            })
        })
    })

    it('T2: Should fetch cars via API and validate created car exists', () => {
        cy.fixture('expensesData').then((data) => {
            garage.setupCarInterception()
            garage.addCar(data.defaultCar)
            garage.waitForCarCreationAndGetId().then((carId) => {
                createdCarId = carId

                cy.getCarsViaAPI().then((response) => {
                    expect(response.status).to.equal(200)

                    const createdCar = response.body.data.find(car => car.id === createdCarId)
                    expect(createdCar).to.exist
                    expect(createdCar.brand).to.equal(data.defaultCar.brand)
                    expect(createdCar.model).to.equal(data.defaultCar.model)
                    expect(createdCar.initialMileage).to.equal(data.defaultCar.mileage)
                    cy.log('Car found in API list')
                })
            })
        })
    })

    it('T3: Should create expense via API and validate response', () => {
        cy.fixture('expensesData').then((data) => {
            garage.setupCarInterception()
            garage.addCar(data.defaultCar)
            garage.waitForCarCreationAndGetId().then((carId) => {
                createdCarId = carId

                cy.createExpenseViaAPI(createdCarId, data.apiExpense).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.data.carId).to.equal(createdCarId)
                    expect(response.body.data.mileage).to.equal(data.apiExpense.mileage)
                    expect(response.body.data.liters).to.equal(data.apiExpense.liters)
                    expect(response.body.data.totalCost).to.equal(data.apiExpense.totalCost)
                    cy.log('Expense created via API')
                })
            })
        })
    })

    it('T4: Should validate expense in UI after API creation', () => {
        cy.fixture('expensesData').then((data) => {
            garage.setupCarInterception()
            garage.addCar(data.defaultCar)
            garage.waitForCarCreationAndGetId().then((carId) => {
                createdCarId = carId

                cy.createExpenseViaAPI(createdCarId, data.apiExpense).then((response) => {
                    expect(response.status).to.equal(200)
                    expensesPage.openExpensesPage()
                    cy.wait(500)

                    expensesListComponent.verifyExpenseExists(
                        data.apiExpense.mileage,
                        data.apiExpense.liters,
                        data.apiExpense.totalCost
                    )
                    cy.log('Expense visible in UI')
                })
            })
        })
    })

    afterEach(() => {
        // Delete all cars via API
        cy.getLoginCredentials().then((creds) => {
            cy.loginAndSaveSid(creds.email, creds.password).then(() => {
                garage.deleteAllCarsViaAPI()
            })
        })
    })
})