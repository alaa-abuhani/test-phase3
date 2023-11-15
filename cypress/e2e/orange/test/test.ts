import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "../../../support/PageObject/login";
import { addCandidate, addEmployee, addJob, addUser, addVacancy, candidateSheduleInterview, candidateShortList, deleteEmployee, deleteEvents, deleteExpenses } from "../../../support/Helper/Claim/api-helper";
import { visitHomePage } from "../../../support/PageObject/common-page-visit";
import moment from "moment";
let firstNameCan: any;
let middleNameCan: any;
let lastNameCan: any;
let date = moment().format("YYYY-MM-DD");
let email: any;
const loginObj: login = new login();
let idVacancy: any;
let idCandidate: any;
let empNumber: number; //store employeeNumber retrieve from API
let employeeName: string;
let vacancyName: any;
let expectValue: any;
let jobTitle: string;
let idjob: any;
let firstName: string;
let lastName: string;
Given("Admin Login", () => {
  cy.intercept("/web/index.php/dashboard/index").as("loginpage");
  visitHomePage();
  cy.fixture("login.json").as("loginInfo");
  cy.get("@loginInfo").then((loginInfo: any) => {
    loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
  });
});
Given("Creat Employee", () => {
  cy.fixture("candidate-info.json").as("candidateInfo");
  cy.get("@candidateInfo").then((candidateInfo: any) => {
    firstNameCan = candidateInfo[0].firstName;
    middleNameCan = candidateInfo[0].middleName;
    lastNameCan = candidateInfo[0].lastName;
    email = candidateInfo[0].email;
  });
  cy.fixture("employee-info.json").as("empInfo");
  cy.get("@empInfo").then((empInfo: any) => {
    firstName = empInfo[0].firstName;
    lastName = empInfo[0].lastName;
    employeeName = empInfo[0].firstName + " " + empInfo[0].lastName;
    vacancyName = empInfo[1].vacancyName + Math.round(1000 * Math.random());
    jobTitle = empInfo[1].jobTitle + Math.round(1000 * Math.random());
    //greate  employee via api
    addEmployee(firstName, empInfo[0].id, lastName).then((empNum: any) => {
      empNumber = empNum;
      addUser(empNum, empInfo[0].userName + Math.round(1000 * Math.random()), empInfo[0].password);
    });
  });
});
Given("Creat Job", () => {
  addJob(jobTitle).then((id) => {
    idjob = id;
    cy.log(id, "jooob", empNumber, vacancyName);
  });
});
Given("Creat Vacancy", () => {
  addVacancy(vacancyName, empNumber, idjob).then((id) => (idVacancy = id));
});
Given("Creat Candidate", () => {
  addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy)
    .then((id) => (idCandidate = id))
    .then(() => candidateShortList(idCandidate))
    .then(() => candidateSheduleInterview(idCandidate, "testing", date, empNumber));
  // cy.visit("/auth/login");
});
When("Recruitment Form Passed", () => {
  cy.get(".oxd-main-menu").contains("Recruitment").click();
  cy.get(".oxd-topbar-body-nav").contains("Candidates").click();
  cy.get(".oxd-select-text-input").eq(1).click({ force: true });
  cy.get(".oxd-select-dropdown").contains(vacancyName).click();
  cy.get(".oxd-button--secondary").eq(0).click({ force: true });
  cy.get(" .oxd-table-cell-actions  >.oxd-icon-button").eq(0).click();
  cy.get(".oxd-button--success").click({ force: true });
  cy.get(".oxd-button--secondary").click();
});

//////////////////////////
When("Recruitment Form Failed", () => {
  cy.get(".oxd-main-menu").contains("Recruitment").click();
  cy.get(".oxd-topbar-body-nav").contains("Candidates").click();
  cy.get(".oxd-select-text-input").eq(1).click({ force: true });
  cy.get(".oxd-select-dropdown").contains(vacancyName).click();
  cy.get(".oxd-button--secondary").eq(0).click({ force: true });
  cy.get(" .oxd-table-cell-actions  >.oxd-icon-button").eq(0).click();
  cy.get(".oxd-button--danger").eq(1).click({ force: true });
  cy.get(".oxd-button--secondary").click();
});

When("check status pass", () => {
  cy.get(".oxd-topbar-body-nav").contains("Candidates").click();
  cy.get(".oxd-select-text-input").eq(1).click({ force: true });
  cy.get(".oxd-select-dropdown").contains(vacancyName).click();
  cy.get(".oxd-button--secondary").eq(0).click({ force: true });
  cy.get(" .oxd-table-cell-actions  >.oxd-icon-button").eq(0).click();
  cy.get(".orangehrm-recruitment-status").should("contain", "Status: Interview Passed");
  let expectValue = [" Reject ", " Schedule Interview ", " Offer Job "];
  cy.get(".orangehrm-recruitment-actions")
    .find("button")
    .each((cell, cellIndex) => {
      cy.wrap(cell).invoke("text").should("contain", expectValue[cellIndex]);
    });
});
When("check status fail", () => {
  cy.get(".oxd-topbar-body-nav").contains("Candidates").click();
  cy.get(".oxd-select-text-input").eq(1).click({ force: true });
  cy.get(".oxd-select-dropdown").contains(vacancyName).click();
  cy.get(".oxd-button--secondary").eq(0).click({ force: true });
  cy.get(" .oxd-table-cell-actions  >.oxd-icon-button").eq(0).click();
  cy.get(".orangehrm-recruitment-status").should("contain", "Status: Interview Failed");
  cy.get("button").should("have.class", "oxd-button--danger");
});
