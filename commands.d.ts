// cypress/support/commands.d.ts

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): void;
    logout: typeof logout;
  }
}
function logout() {
  cy.get(".oxd-userdropdown-tab").click({ force: true });
  cy.get(".oxd-dropdown-menu").contains("Logout").click({ force: true });
}
Cypress.Commands.add("logout", logout);
