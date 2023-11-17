class login {
  elements = {
    userName: () => cy.get('[placeholder="Username"]'),
    password: () => cy.get('[placeholder="Password"]'),
    loginBtn: () => cy.get("button"),
    Dashboard: () => cy.get(".oxd-topbar-header-title"),

    MessageRequiredUsername: () => cy.get(" .oxd-input-group > .oxd-text"),
    MessageRequiresPassword: () => cy.get(".oxd-input-group > .oxd-text"),
  };

  loginValid(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
    this.elements.Dashboard().should("contain", "Dashboard");
  }
  loginInValid(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
  }
}
export default login;
