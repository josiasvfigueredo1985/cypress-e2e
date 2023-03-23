// cypress/support/commands.js

const attachFileHandler = () => cy.get('#file').attachFile('example.json')
const getNote = () => cy.intercept('GET', '**/notes/**')

Cypress.Commands.add('fillSignupFormAndSubmit', (email, password) => {
  cy.visit('/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')
})

Cypress.Commands.add('login', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD'),
  { cacheSession = true } = {}
) => {
  const login = () => {
    cy.visit('/login')
    cy.get('#email').type(username)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Login').click()
    cy.contains('h1', 'Your Notes').should('be.visible')
  }

  if (cacheSession) {
    cy.session([username, password], login)
  } else {
    login()
  }
})

Cypress.Commands.add('createNotes', (note, attachFile = false) => {
  cy.visit('/notes/new')
  cy.get('#content').type(note)
  if (attachFile) {
    attachFileHandler()
  }
  cy.contains('button', 'Create').click()
})

Cypress.Commands.add('editNotes', (noteDescription, newValue, attachFile = false) => {
  //Edit note
  cy.contains('.list-group-item', noteDescription)
    .should('be.visible')
    .click()
  getNote()
  cy.get('#content')
    .clear()
    .type(newValue)
  if (attachFile) {
    attachFileHandler()
  }
  cy.contains('button', 'Save').click()
})

Cypress.Commands.add('deleteNotes', (noteDescription, newValue) => {
  cy.contains('.list-group-item', noteDescription).should('not.exist')
  cy.contains('.list-group-item', newValue)
    .should('be.visible')
    .click()
  getNote()
  cy.contains('button', 'Delete').click()
  cy.contains('.list-group-item', newValue).should('not.exist')
})

Cypress.Commands.add('fillSettingsFormAndSubmit', () => {
  cy.visit('/settings')
  cy.get('#storage').type('1')
  cy.get('#name').type('Mary Doe')
  cy.iframe('.card-field iframe')
    .as('iframe')
    .find('[name="cardnumber"]')
    .type('4242424242424242')
  cy.get('@iframe')
    .find('[name="exp-date"]')
    .type('1271')
  cy.get('@iframe')
    .find('[name="cvc"]')
    .type('123')
  cy.get('@iframe')
    .find('[name="postal"]')
    .type('12345')
  cy.contains('button', 'Purchase').click()
})