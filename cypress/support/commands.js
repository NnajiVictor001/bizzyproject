import { faker } from '@faker-js/faker';

Cypress.Commands.add('getCy', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

Cypress.Commands.add('login', (username, password) => {
  cy.session([username, password], () => {
    cy.intercept('POST', '**/login').as('login');
    cy.intercept('POST', '**/signup').as('signup');
    cy.visit('/');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button').contains('Sign In').click();
    cy.wait('@login');
    cy.window().then((window) => {
      const element = window.document.querySelector('[data-cy="alert"]');
      if (element) {
        cy.get('a').contains('Sign Up').click();
        cy.get('#first_name').type('Cypress');
        cy.get('#last_name').type('Tester');
        cy.get('#username').type(username);
        cy.get('#email').type(faker.internet.email());
        cy.get('#phone_number').type(faker.phone.number());
        cy.get('#business_name').type(faker.company.name());
        cy.get('#password').type(password);
        cy.get('#repeatPassword').type(password);
        cy.get('#terms').should('not.be.visible').check({ force: true });
        cy.get('button').contains('Next').click();
        cy.wait('@signup');
      }
    });
  });
});
