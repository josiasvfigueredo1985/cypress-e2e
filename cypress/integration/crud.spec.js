// // cypress/integration/crud.spec.js

// it('CRUDs a note', () => {
//     const faker = require('faker')
//     const noteDescription = faker.lorem.words(4)

//     cy.intercept('GET', '**/prod/notes').as('getNotes')
//     cy.intercept('GET', '**/notes/**').as('getNote')
//     cy.login()

//     cy.visit('/notes/new')
//     cy.get('#content').type(noteDescription)
//     cy.contains('button', 'Create').click()

//     cy.wait('@getNotes')
//     cy.contains('.list-group-item', noteDescription)
//         .should('be.visible')
//         .click()
//     cy.wait('@getNote')

//     const updatedNoteDescription = faker.lorem.words(4)

//     cy.get('#content')
//         .clear()
//         .type(updatedNoteDescription)
//     cy.contains('button', 'Save').click()
//     cy.wait('@getNotes')

//     cy.contains('.list-group-item', noteDescription).should('not.exist')
//     cy.contains('.list-group-item', updatedNoteDescription)
//         .should('be.visible')
//         .click()
//     cy.wait('@getNote')
//     cy.contains('button', 'Delete').click()
//     cy.wait('@getNotes')

//     cy.contains('.list-group-item', updatedNoteDescription).should('not.exist')
// })

// // cypress/integration/crud.spec.js

// it('CRUDs a note - attach a file', () => {
//     const faker = require('faker')
//     const noteDescription = faker.lorem.words(4)
//     const updatedNoteDescription = faker.lorem.words(4)

//     cy.intercept('GET', '**/notes').as('getNotes')
//     cy.intercept('GET', '**/notes/**').as('getNote')
//     cy.login()

//     // Create notes
//     cy.createNotes(noteDescription)
//     cy.wait('@getNotes')

//     //Edit note
//     cy.editNotes(noteDescription, updatedNoteDescription, true)
//     cy.wait('@getNotes')

//     //Delete note
//     cy.deleteNotes(noteDescription, updatedNoteDescription)
//     cy.wait('@getNotes')
// })