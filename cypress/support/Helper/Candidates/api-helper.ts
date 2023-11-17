import { candidateData, employeeData, jobData, sheduleInterviewData, userData, vacancyData } from "./payload-function";

const baseUrl = Cypress.config().baseUrl;
export const URLs: any = {
  employee: `${baseUrl}/api/v2/pim/employees`,
  user: `${baseUrl}/api/v2/admin/users`,
  candidates: `${baseUrl}/api/v2/recruitment/candidates`,
  vacancy: `${baseUrl}/api/v2/recruitment/vacancies`,
  claimRequests: `${baseUrl}/api/v2/claim/requests`,
  job: `${baseUrl}/api/v2/admin/job-titles`,
};

export const addEmployee = (firstName: string, id: string, lastName: string) => {
  return cy.api({ method: "POST", url: URLs.employee, body: employeeData(firstName, id, lastName) }).then((res) => res.body.data.empNumber);
};
export const addUser = (empNum: any, userName: any, password: any) => {
  cy.api({
    method: "POST",
    url: URLs.user,
    body: userData(empNum, userName, password),
  });
};
export const addJob = (jobTitle: any) => {
  return cy.api({ method: "POST", url: URLs.job, body: jobData(jobTitle) }).then((res) => res.body.data.id);
};
export const addVacancy = (vacancyName: any, employeeId: any, jobId: any) => {
  return cy
    .api({
      method: "POST",
      url: URLs.vacancy,
      body: vacancyData(vacancyName, employeeId, jobId),
    })
    .then((res) => res.body.data.id);
};
export const addCandidate = (firstName: any, middleName: any, lastName: any, date: any, email: any, vacancyId: any) => {
  return cy
    .api({
      method: "POST",
      url: URLs.candidates,
      body: candidateData(firstName, middleName, lastName, date, email, vacancyId),
    })
    .then((res) => res.body.data.id);
};

export const sheduleInterview = (idCandidate: any, interviewName: any, interviewDate: any, empNumber: any) => {
  return cy
    .api({
      method: "POST",
      url: `/api/v2/recruitment/candidates/${idCandidate}/shedule-interview`,
      body: sheduleInterviewData(interviewName, interviewDate, empNumber),
    })
    .then((res) => res.body.data.id);
};
export const candidateHired = (idCandidate: any, idInterview: any) => {
  cy.api({
    method: "PUT",
    url: `/api/v2/recruitment/candidates/${idCandidate}/interviews/${idInterview}/pass`,
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
};

export const candidateShortList = (idCandidate: any) => {
  return cy
    .api({
      method: "PUT",
      url: `/api/v2/recruitment/candidates/${idCandidate}/shortlist`,
      body: {
        note: null,
      },
    })
    .then((res) => res);
};

export const deleteEmployee = (empNumber: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.employee,
    body: {
      ids: [empNumber],
    },
  });
};
export const deleteJob = (jobId: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.job,
    body: {
      ids: [jobId],
    },
  });
};
export const deleteVacancy = (vacancyId: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.vacancy,
    body: {
      ids: [vacancyId],
    },
  });
};

export const deleteCandidates = (candidatesId: any) => {
  cy.api({
    method: "DELETE",
    url: URLs.candidates,
    body: {
      ids: [candidatesId],
    },
  });
};
