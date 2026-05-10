Cypress.Commands.add('openApp', () => {
  const baseUrl = Cypress.config('baseUrl')
  cy.log(`Opening: ${baseUrl}`)
  cy.visit(baseUrl, {
    auth: {
      username: Cypress.env('usernamePage'),
      password: Cypress.env('passwordPage')
    }
  })
})

Cypress.Commands.add('getLoginCredentials', () => {
  return {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
    environment: Cypress.env('environmentName')
  }
})

// ---- Login, set and save SID ----
Cypress.Commands.add('loginAndSaveSid', (email, password) => {
  return cy.session([email, password], () => {
    return cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}api/auth/signin`,
      body: {
        email,
        password,
        remember: false
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      cy.log(`User logged in: ${email}`)
    })
  })
})

// ---- Create expense via API -----
Cypress.Commands.add('createExpenseViaAPI', (carId, expenseData) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}api/expenses`,

    body: {
      carId: carId,
      mileage: expenseData.mileage,
      liters: expenseData.liters,
      totalCost: expenseData.totalCost,
      reportedAt: expenseData.date,
      forceMileage: false
    }
  })
})

// ---- Get all cars via API ----
Cypress.Commands.add('getCarsViaAPI', () => {
  return cy.request({
    method: 'GET',
    url: `${Cypress.config('baseUrl')}api/cars`,
    failOnStatusCode: false
  })
})