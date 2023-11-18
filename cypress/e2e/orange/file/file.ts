import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "../../../support/PageObject/login";
import { addCandidate, addEmployee, addJob, addUser, addVacancy, candidateHired, candidateShortList, deleteCandidates, deleteEmployee, deleteJob, deleteVacancy, sheduleInterview } from "../../../support/Helper/Candidates/api-helper";
import { visitHomePage } from "../../../support/PageObject/common-page-visit";
import moment from "moment";
import File from "../../../support/PageObject/File/file-action";
import { checkDataFile } from "../../../support/PageObject/File/file-assertion";
const path = "cypress/fixtures/alaa.txt";
const loginObj: login = new login();
let date = moment().format("YYYY-MM-DD");
let interviewName = "QA engineer";
let firstNameCan: any;
let middleNameCan: any;
let lastNameCan: any;
let email: any;
let idVacancy: any;
let idCandidate: any;
let empNumber: number; //store employeeNumber retrieve from API
let vacancyName: any;
let jobTitle: string;
let idJob: any;
Given("Admin login", () => {
  cy.intercept("/web/index.php/dashboard/index").as("loginpage");
  visitHomePage();
  cy.fixture("login.json").as("loginInfo");
  cy.get("@loginInfo").then((loginInfo: any) => {
    loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
  });
});
Given("Create Employee", () => {
  cy.fixture("candidate-info.json").as("candidateInfo");
  cy.get("@candidateInfo").then((candidateInfo: any) => {
    firstNameCan = candidateInfo[0].firstName;
    middleNameCan = candidateInfo[0].middleName;
    lastNameCan = candidateInfo[0].lastName;
    email = candidateInfo[0].email;
  });
  cy.fixture("employee-info.json").as("empInfo");
  cy.get("@empInfo").then((empInfo: any) => {
    vacancyName = empInfo[1].vacancyName;
    jobTitle = empInfo[1].jobTitle;
    //greate  employee via api
    addEmployee(empInfo[0].firstName, empInfo[0].id, empInfo[0].lastName).then((empNum: any) => {
      empNumber = empNum;
      addUser(empNum, empInfo[0].userName, empInfo[0].password);
    });
  });
});
Given("Create job", () => {
  addJob(jobTitle).then((id) => (idJob = id));
});
Given("Create Vacancy", () => {
  addVacancy(vacancyName, empNumber, idJob).then((id) => (idVacancy = id));
});
Given("Create Candidate", () => {
  addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy).then((id) => (idCandidate = id));
});
Given("Create Candidate to Hired", () => {
  addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy).then((id) => {
    idCandidate = id;
    candidateShortList(idCandidate);
    sheduleInterview(idCandidate, interviewName, date, empNumber).then((idInterview) => {
      candidateHired(idCandidate, idInterview);
    });
  });
});

When("Upload the file", () => {
  File.uploadedFile(vacancyName, path);
});

Then("Check upload file should contain the same data as was uploaded", () => {
  checkDataFile("cypress/downloads/alaa.txt", "hello");
  deleteEmployee(empNumber);
  deleteJob(idJob);
  deleteVacancy(idVacancy);
  deleteCandidates(idCandidate);
});
