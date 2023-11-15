export default class Candidate {
  static elements = {
    recruitmentPage: () => cy.get(".oxd-main-menu").contains("Recruitment"),
    candidatesTab: () => cy.get(".oxd-topbar-body-nav").contains("Candidates"),
    selectInput: () => cy.get(".oxd-select-text-input").eq(1),
    dropDown: () => cy.get(".oxd-select-dropdown"),
    searchBtn: () => cy.get(".oxd-button--secondary").eq(0),
    actionsIcon: () => cy.get(" .oxd-table-cell-actions  >.oxd-icon-button").eq(0),
    successBtb: () => cy.get(".oxd-button--success"),
    rejectBtn: () => cy.get(".oxd-button--danger").eq(1),
    saveBtn: () => cy.get(".oxd-button--secondary"),
  };

  static approveReject(vacancyName: any, action: string) {
    this.elements.recruitmentPage().click();
    this.elements.candidatesTab().click();
    this.elements.selectInput().click({ force: true });
    this.elements.dropDown().contains(vacancyName).click();
    this.elements.searchBtn().eq(0).click({ force: true });
    this.elements.actionsIcon().click();
    if (action == "success") {
      this.elements.successBtb().click({ force: true });
    } else {
      this.elements.rejectBtn().click({ force: true });
    }
    this.elements.saveBtn().click();
  }
}
