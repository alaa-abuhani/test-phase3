import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "../../../support/PageObject/login";
import { addCandidate, addEmployee, addJob, addUser, addVacancy, candidateSheduleInterview, candidateShortList, deleteEmployee, deleteEvents, deleteExpenses } from "../../../support/Helper/Claim/api-helper";
import { visitHomePage } from "../../../support/PageObject/common-page-visit";
import { ckeckClaimTableAssertion } from "../../../support/PageObject/Claim/claim-assertion";
import ClaimAssign from "../../../support/PageObject/Claim/claim-action";
import moment from "moment";

// } from "../../support/Helper/Claim/api-helper";
// import { visitHomePage } from "../../support/PageObject/common-page-visit";
// import moment from "moment";
// import { ckeckClaimTableAssertion } from "../../support/PageObject/Claim/claim-assertion";
// import ClaimAssign from "../../support/PageObject/Claim/claim-action";
let firstNameCan: any;
let middleNameCan: any;
let lastNameCan: any;
let date = moment().format("YYYY-MM-DD");
let email: any;
const loginObj: login = new login();
let eventTitle: string;
let exspensName: string;
let idVacancy: any;
let idCandidate: any;
let empNumber: number; //store employeeNumber retrieve from API
// let  idjob: any;
let employeeName: string;
let referenceId: any;
let status: any;
let amount = "100.00";
// let date = moment().format("YYYY-MM-DD");
let currencyId = "JOD";
let vacancyName: any;
let expectValue: any;
export let jobTitle: string;
let idjob: any;
let firstName: string;
let lastName: string;
Given("I navigate to site", () => {
  cy.intercept("/web/index.php/dashboard/index").as("loginpage");
  visitHomePage();
  //admin login
  cy.fixture("login.json").as("loginInfo");
  cy.get("@loginInfo").then((loginInfo: any) => {
    loginObj.loginValid(loginInfo.Admin, loginInfo.Password);
  });
  cy.fixture("candidate-info.json").as("candidateInfo");
  cy.get("@candidateInfo").then((candidateInfo: any) => {
    firstNameCan = candidateInfo[0].firstName;
    middleNameCan = candidateInfo[0].middleName;
    lastNameCan = candidateInfo[0].lastName;
    email = candidateInfo[0].email;
  });

  cy.fixture("employee-claim-Info.json").as("empInfo");
  cy.get("@empInfo").then((empInfo: any) => {
    firstName = empInfo[0].firstName;
    lastName = empInfo[0].lastName;
    employeeName = empInfo[0].firstName + " " + empInfo[0].lastName;
    // eventTitle = empInfo[1].eventTitle;
    vacancyName = empInfo[1].vacancyName + Math.round(1000 * Math.random());
    jobTitle = empInfo[1].jobTitle + Math.round(1000 * Math.random());
    //greate  employee via api
    addEmployee(firstName, empInfo[0].id, lastName)
      .then((empNum: any) => {
        empNumber = empNum;
        addUser(empNum, empInfo[0].userName + Math.round(1000 * Math.random()), empInfo[0].password);
      })
      .then(() => {
        cy.log(firstName);
        addJob(jobTitle)
          .then((id) => {
            idjob = id;
            cy.log(id, "jooob", empNumber, vacancyName);
          })
          .then(() => {
            addVacancy(vacancyName, empNumber, idjob)
              .then((id) => {
                idVacancy = id;
              })
              .then(() => {
                addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy).then((id) => (idCandidate = id));
              })
              .then(() => {
                cy.log(idCandidate, "iddddddddddddddd");
                candidateShortList(idCandidate);
              })
              .then(() => {
                candidateSheduleInterview(idCandidate, "testing", date, empNumber);
              });
          });
      });
    // cy.visit("/auth/login");
  });
});
