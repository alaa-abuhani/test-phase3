export default class File {
  static elements = {
    recruitmentPage: () => cy.get(".oxd-main-menu").contains("Recruitment"),
    candidatesTab: () => cy.get(".oxd-topbar-body-nav").contains("Candidates"),
    selectInput: () => cy.get(".oxd-select-text-input").eq(1),
    dropDown: () => cy.get(".oxd-select-dropdown"),
    searchBtn: () => cy.get(".oxd-button--secondary").eq(0),
    actionsIcon: () => cy.get(" .oxd-table-cell-actions  > .oxd-icon-button").eq(0),
    successBtb: () => cy.get(".oxd-button--success").eq(0),
    rejectBtn: () => cy.get(".oxd-button--danger").eq(1),
    saveBtn: () => cy.get(".oxd-button--secondary"),
  };

  static uploaedFile(vacancyName: any, path: any) {
    this.elements.recruitmentPage().click();
    this.elements.candidatesTab().click();
    this.elements.selectInput().click({ force: true });
    this.elements.dropDown().contains(vacancyName).click();
    this.elements.searchBtn().click({ force: true });
    cy.wait(1000);
    cy.get(".oxd-table-cell-actions > :nth-child(1) > .oxd-icon").click();
    // this.elements.actionsIcon().click();
    cy.get(".oxd-switch-input").click({ force: true });
    cy.get('input[type="file"]')
      .selectFile(path, {
        force: true,
      })
      .then(() => {
        this.elements.saveBtn().click({ force: true });
        cy.get(".orangehrm-file-preview", { timeout: 40000 }).click({ force: true });
        cy.wait(3000);
      });
    // this.elements.saveBtn().click({ force: true });
  }
}
