// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { AuthPage } from "./pages/authPage";
const authPage = new AuthPage();
const baseUrl = "https://pushing-it.onrender.com";

Cypress.Commands.add("registerWithAPI", () => {
  cy.request({
    method: "POST",
    url: `${baseUrl}/api/register`,
    body: {
      username: "pruebasIT1",
      password: "123456!",
      gender: "Male",
      year: "1996",
      month: "November",
      day: "20",
    },
  }).then((respuesta) => {
    expect(respuesta.status).to.be.equal(201);
  });
});

Cypress.Commands.add("loginWithAPI", (username, password) => {
  cy.request({
    method: "POST",
    url: `${baseUrl}/api/login`,
    body: {
      username: username,
      password: password,
    },
  }).then((respuesta) => {
    window.localStorage.setItem("token", respuesta.body.token);
    window.localStorage.setItem("user", respuesta.body.user.username);
    //window.localStorage.setItem("userId", respuesta.body.user._id);
  });
});