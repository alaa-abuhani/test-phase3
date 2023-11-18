export const checkDataFile = (path: string, content: string) => {
  cy.readFile(path).should("contain", content);
};
