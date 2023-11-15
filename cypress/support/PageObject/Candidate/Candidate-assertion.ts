export const checkFailAndButton = () => {
  //check status
  cy.get(".orangehrm-recruitment-status").should("contain", "Status: Interview Failed");
  //check button exists
  cy.get("button").should("contain", "Reject");
};

export const checkPassAndButtons = (btnNames: any) => {
  //check status
  cy.get(".orangehrm-recruitment-status").should("contain", "Status: Interview Passed");
  //check three button exists
  cy.get(".orangehrm-recruitment-actions")
    .find("button")
    .each((cell, cellIndex) => {
      cy.wrap(cell).invoke("text").should("contain", btnNames[cellIndex]);
    });
};
