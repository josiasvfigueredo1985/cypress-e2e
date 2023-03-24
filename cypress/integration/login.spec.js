/// <reference path="../support/commands.d.ts" />
// cypress/integration/login.spec.js

it('successfully logs in', () => {
  cy.intercept('GET', '**/prod/notes').as('getNotes')

  cy.login(
    Cypress.env('USER_EMAIL'),
    Cypress.env('USER_PASSWORD'),
    { cacheSession: false }
  )
  cy.wait('@getNotes')
})