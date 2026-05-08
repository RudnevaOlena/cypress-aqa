import BasePage from '../pages/basePage'

class SideMenu extends BasePage {

    selectors = {
        garage: 'a[routerlink="garage"]',
        fuelExpenses: 'a[routerlink="expenses"]',
        instructions: 'a[routerlink="instructions"]',
        profile: 'a[routerlink="profile"]',
        settings: 'a[routerlink="settings"]',
        logout: 'a.icon-logout'
    }

    // ---- ACTIONS ----

    clickGarage() {
        this.click(this.selectors.garage)
    }

    clickExpenses() {
        this.click(this.selectors.fuelExpenses)
    }

    clickProfile() {
        this.click(this.selectors.profile)
    }

    clickSettings() {
        this.click(this.selectors.settings)
    }

    clickLogout() {
        this.click(this.selectors.logout)
    }
}

export default new SideMenu()