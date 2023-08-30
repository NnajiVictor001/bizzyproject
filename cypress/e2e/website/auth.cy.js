/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('authorization', () => {
  let temporaryMail;
  let data; // closure variable

  before(() => {
    cy.task('initEmail', faker.lorem.word());
    cy.task('createEmail').then((email) => {
      temporaryMail = email;
    });
    cy.fixture('credentials').then((credentials) => {
      data = credentials;
    });
  });

  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const username = faker.internet.userName();
  const phone_number = faker.phone.number();
  const business_name = faker.company.name();
  const fakeMail = faker.internet.email();

  it('create user - should give input errors', () => {
    cy.visit('/');
    cy.getCy('sign_up').click();
    cy.url().should('contain', 'register/user-data');

    cy.getCy('submit').should('be.disabled');

    cy.getCy('first_name').type(first_name).should('have.value', first_name);
    cy.getCy('last_name').type(last_name).should('have.value', last_name);
    cy.getCy('username').type(username).should('have.value', username);
    cy.getCy('email').type(fakeMail).should('have.value', fakeMail);
    cy.getCy('phone_number').type(phone_number).should('have.value', phone_number);
    cy.getCy('business_name').type(business_name).should('have.value', business_name);

    cy.getCy('terms').check({ force: true }).should('be.checked');

    cy.getCy('password').type('qwerasd').should('have.value', 'qwerasd');
    cy.getCy('repeatPassword').type('qwerasd').should('have.value', 'qwerasd');

    cy.getCy('submit').contains('Next').click();
    cy.getCy('alert').should('contain.text', 'Password should contain at least one number!');

    cy.getCy('password').clear().type('qwerasdf');
    cy.getCy('repeatPassword').clear().type('qwerasdf');
    cy.getCy('submit').contains('Next').click();

    cy.getCy('alert').should('contain.text', 'Password should contain at least one number');

    cy.getCy('password').clear().type('12345678');
    cy.getCy('repeatPassword').clear().type('12345678');
    cy.getCy('submit').contains('Next').click();
    cy.getCy('alert').should('contain.text', 'Password should contain at least one letter');

    cy.getCy('password').clear().type('Qwe123567');
    cy.getCy('repeatPassword').clear().type('Qwe123456');
    cy.getCy('submit').contains('Next').click();
    cy.getCy('alert').should('contain.text', 'Passwords are not the same');
  });

  it('create user - should create a new user', () => {
    cy.visit('/');
    cy.intercept('POST', '**/signup').as('signup');
    cy.getCy('sign_up').click();
    cy.url().should('contain', 'register/user-data');
    cy.getCy('submit').should('be.disabled');

    cy.getCy('first_name').type(first_name).should('have.value', first_name);
    cy.getCy('last_name').type(last_name).should('have.value', last_name);
    cy.getCy('username').type(username).should('have.value', username);
    cy.getCy('email').type(temporaryMail).should('have.value', temporaryMail);
    cy.getCy('phone_number').type(phone_number).should('have.value', phone_number);
    cy.getCy('business_name').type(business_name).should('have.value', business_name);
    cy.getCy('password').type(data.password).should('have.value', data.password);
    cy.getCy('repeatPassword').type(data.password).should('have.value', data.password);

    cy.getCy('terms').check({ force: true }).should('be.checked');

    cy.getCy('submit').contains('Next').click();
    cy.wait('@signup');
    cy.url().should('contain', 'dashboard');
  });

  it('login user - should display error', () => {
    const incorrectPassword = faker.lorem.word();
    cy.visit('/');
    cy.intercept('POST', '**/login').as('login');

    cy.getCy('username').type(username).should('have.value', username);
    cy.getCy('password').type(incorrectPassword).should('have.value', incorrectPassword);

    cy.getCy('submit').click();

    cy.wait('@login');
    cy.getCy('alert').should('contain.text', 'No active account found with the given credentials!');
  });

  it('login user - should sign in', () => {
    cy.visit('/');
    cy.intercept('POST', '**/login').as('login');

    cy.getCy('username').type(username).should('have.value', username);
    cy.getCy('password').type(data.password).should('have.value', data.password);

    cy.getCy('submit').click();

    cy.wait('@login');

    cy.url().should('contain', 'dashboard');
  });

  it('reset password - should display error', () => {
    cy.intercept('POST', '**/reset-password-request').as('reset_password');
    cy.visit('/');

    cy.getCy('forgot_password').click();

    cy.getCy('email').type(fakeMail).should('have.value', fakeMail);
    cy.getCy('submit').click();
    cy.wait('@reset_password');
    cy.getCy('alert').should('exist');
  });

  it('reset password - should recover password', () => {
    cy.intercept('POST', '**/reset-password-request').as('reset_password');
    cy.intercept('POST', 'https://www.1secmail.com/api/v1/**').as('email');
    cy.visit('/');

    cy.getCy('forgot_password').click();

    cy.log(temporaryMail);

    cy.getCy('email').type(temporaryMail).should('have.value', temporaryMail);
    cy.getCy('submit').click();

    cy.wait('@reset_password');

    cy.getCy('alert').should('contain.text', 'Password Reset Email Successfully Sent!');

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(7000); // 7 second wait to recieve email

    cy.task('getEmails').then((emails) => {
      const { messages } = emails;
      cy.log('Messages: ', messages);
      if (messages.length) cy.log('Email Recieved', messages[0]);

      cy.wrap(messages[0]).should('have.a.property', 'message');

      const msg = messages[0].message;
      cy.visit(msg.slice(msg.indexOf('http'), msg.indexOf('==') + 2));

      cy.get('#password').type(data.password).should('have.value', data.password);
      cy.get('#repeatPassword').type(data.password).should('have.value', data.password);
      cy.get('button').type('submit').click();
    });
  });
});
