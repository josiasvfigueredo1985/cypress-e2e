// authenticatedScenarios.spec.js

describe('Scenarios where authentication is a pre-requirement', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/prod/notes').as('getNotes')
    cy.login()
  })

  it.only('CRUDs a note', () => {
    const faker = require('faker')
    const noteDescription = faker.lorem.words(4)

    cy.createNote(noteDescription)
    cy.wait('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)
    const attachFile = true

    cy.editNote(noteDescription, updatedNoteDescription, attachFile)
    cy.wait('@getNotes')

    cy.deleteNote(noteDescription, updatedNoteDescription)
    cy.wait('@getNotes')
  })

  it('successfully submits the form', () => {
    cy.intercept('POST', '**/prod/billing').as('paymentRequest')
    cy.fillSettingsFormAndSubmit()
    cy.wait('@getNotes')
    cy.wait('@paymentRequest').then(response => {
      expect(response.state).to.equal('Complete')
    })
  })

  it('logs out', { tags: '@desktop-and-tablet' },() => {
    //npx cypress open --config viewportWidth=767,viewportHeight=480
    cy.visit('/')
    //cy.wait('@getNotes')
    cy.wait(2000)
    // if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
    //   cy.get('.navbar-toggle.collapsed')
    //     .should('be.visible')
    //     .click()
    // }
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.nav > :nth-child(2) > a').click()
    cy.get('#email').should('be.visible')
    cy.get('#password').click()
    cy.get('#password').should('be.visible')
    cy.get('.LoaderButton').should('be.visible')
    /* ==== End Cypress Studio ==== */
  })
})

