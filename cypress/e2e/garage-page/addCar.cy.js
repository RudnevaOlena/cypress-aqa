import garage from '../../pages/garagePage'
import header from '../../pages/header'
import loginModal from '../../pages/loginModal'

describe('Garage: Add Car', () => {

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

    describe('Positive Cases for Add Car', () => {

        afterEach(() => {
            garage.getAllCarItems().then(($cars) => {
                if ($cars.length > 0) {
                    for (let i = 0; i < $cars.length; i++) {
                        garage.clickEditButtonOnLatestCar()
                        garage.getEditModal().should('be.visible')
                        garage.clickRemoveCarButton()
                        garage.getRemoveModal().should('be.visible')
                        garage.clickRemoveConfirmButton()
                        garage.getRemoveModal().should('not.exist')
                        cy.wait(300)
                    }
                }
            })
        })

        it('Should add car with default values', () => {
            cy.fixture('GarageData').then((data) => {
                garage.openAddCarModal()
                garage.typeMileage(data.defaultCar.mileage)
                garage.clickAdd()
                garage.getLatestCarName()
                    .should('contain', `${data.defaultCar.brand} ${data.defaultCar.model}`)

                garage.getLatestCarMileage()
                    .should('have.value', String(data.defaultCar.mileage))
            })
        })

        it('Should add cars from fixture', () => {
            cy.fixture('garageData').then((data) => {
                data.cars.forEach(car => {
                    garage.openAddCarModal()
                    garage.selectBrand(car.brand)
                    garage.selectModel(car.model)
                    garage.typeMileage(car.mileage)
                    garage.clickAdd()

                    garage.getLatestCarName()
                        .should('contain', `${car.brand} ${car.model}`)
                })
            })
        })
    })

    describe('Negative Cases and general tests (without car adding)', () => {

        it('Should not add car without mileage', () => {
            cy.fixture('garageData').then((data) => {
                garage.openAddCarModal()
                garage.getAddButton().should('be.disabled')
                garage.closeModal()
            })
        })

        it('Should show error for negative mileage', () => {
            cy.fixture('GarageData').then((data) => {
                garage.openAddCarModal()
                garage.typeMileage(data.invalid.negativeMileage)
                garage.getMileageInputModal().blur()

                garage.getMileageInputModal().should('have.class', 'is-invalid')
                garage.getMileageError().should('be.visible')
                    .and('contain', 'Mileage has to be from 0 to 999999')
                garage.getAddButton().should('be.disabled')
                garage.closeModal()
            })
        })

        it('Should show default brand and model', () => {
            garage.openAddCarModal()
            garage.getSelectedBrand()
                .should('have.text', 'Audi')

            garage.getSelectedModel()
                .should('have.text', 'TT')

            garage.closeModal()
        })
    })
})