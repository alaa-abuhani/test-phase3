import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import login from "../../support/PageObject/login";
import { addCandidate, addEmployee, addJob, addUser, addVacancy, candidateShortList, deleteCandidates, deleteEmployee, deleteJob, deleteVacancy, sheduleInterview } from "../../support/Helper/Candidates/api-helper";
import { visitHomePage } from "../../support/PageObject/common-page-visit";
import moment from "moment";
import File from "../../support/PageObject/File/file-action";
// import Candidate from "../../support/PageObject/Candidate/candidate-action";
// import { checkFailAndButton, checkPassAndButtons } from "../../support/PageObject/Candidate/candidate-assertion";
const path = "cypress/fixtures/alaa.txt";
let firstNameCan: any;
let middleNameCan: any;
let lastNameCan: any;
let date = moment().format("YYYY-MM-DD");
let email: any;
const loginObj: login = new login();
let idVacancy: any;
let idCandidate: any;
let empNumber: number; //store employeeNumber retrieve from API
let vacancyName: any;
let buttonsName = ["Reject", "Schedule Interview", "Offer Job"];
let jobTitle: string;
let idjob: any;
Given("Admin login", () => {
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
    vacancyName = empInfo[1].vacancyName;
    jobTitle = empInfo[1].jobTitle;
    //greate  employee via api
    addEmployee(empInfo[0].firstName, empInfo[0].id, empInfo[0].lastName).then((empNum: any) => {
      empNumber = empNum;
      addUser(empNum, empInfo[0].userName, empInfo[0].password);
    });
  });
});
Given("Creat job", () => {
  addJob(jobTitle).then((id) => (idjob = id));
});
Given("Creat Vacancy", () => {
  addVacancy(vacancyName, empNumber, idjob).then((id) => (idVacancy = id));
});
Given("Creat Candidate", () => {
  addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy).then((id) => {
    idCandidate = id;
    // candidateShortList(idCandidate);
    // sheduleInterview(idCandidate, "testing", date, empNumber);
  });
});
Given("Creat Candidate to Hired", () => {
  addCandidate(firstNameCan, middleNameCan, lastNameCan, date, email, idVacancy).then((id) => {
    idCandidate = id;
    candidateShortList(idCandidate);
    sheduleInterview(idCandidate, "testing", date, empNumber).then((id) => {
      cy.log(`${id}`, "DKJNGDRKJGNSDKJGNSDKGND");
      cy.api({
        method: "PUT",
        url: `/api/v2/recruitment/candidates/${idCandidate}/interviews/${id}/pass`,
        body: {
          note: null,
        },
      })
        .then(() => {
          cy.api({
            method: "PUT",
            url: `/api/v2/recruitment/candidates/${idCandidate}/job/offer`,
            body: {
              note: null,
            },
          });
        })
        .then(() => {
          cy.api({
            method: "PUT",
            url: `/api/v2/recruitment/candidates/${idCandidate}/hire`,
            body: {
              note: null,
            },
          });
        });
    });
  });
});

When("upload the file", () => {
  // File.approveReject(vacancyName);
  File.uploaedFile(vacancyName, path);
});

// When("Recruitment Form Failed", () => {
//   Candidate.approveReject(vacancyName, "fail");
// });

//
//https:opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/29/job/offer
// https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/29/hire
Then("Check upload file", () => {
  //   checkPassAndButtons(buttonsName);
  deleteEmployee(empNumber);
  deleteJob(idjob);
  deleteVacancy(idVacancy);
  deleteCandidates(idCandidate);
});
// Then("Check Status Fail", () => {
//   checkFailAndButton();
//   deleteEmployee(empNumber);
//   deleteJob(idjob);
//   deleteVacancy(idVacancy);
//   deleteCandidates(idCandidate);
// });
