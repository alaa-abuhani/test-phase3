export const employeeData = (firstName: string, id: string, lastName: string): any => {
  let employee: any = {
    empPicture: null,
    employeeId: id,
    firstName: firstName,
    lastName: lastName,
    middleName: "",
  };
  return employee;
};
export const userData = (empNum: any, userName: any, password: any) => {
  let user: any = {
    username: userName,
    password: password,
    status: true,
    userRoleId: 2,
    empNumber: empNum,
  };
  return user;
};

export const sheduleInterviewData = (interviewName: any, interviewDate: any, empNumber: any): any => {
  let event: any = {
    interviewName: interviewName,
    interviewDate: interviewDate,
    interviewTime: null,
    note: null,
    interviewerEmpNumbers: [empNumber],
  };
  return event;
};
export const jobData = (jobTitle: any): any => {
  let job: any = {
    title: jobTitle,
    description: "",
    specification: null,
    note: "",
  };
  return job;
};
export const vacancyData = (vacancyName: any, employeeId: any, jobTitleId: any): any => {
  let Vacancy: any = {
    name: vacancyName,
    jobTitleId: jobTitleId,
    employeeId: employeeId,
    numOfPositions: null,
    description: "",
    status: true,
    isPublished: true,
  };
  return Vacancy;
};
export const addClaimData = (idEvent: any, currencyId: any): any => {
  let addClaim: any = {
    claimEventId: idEvent,
    currencyId: currencyId,
    remarks: null,
  };
  return addClaim;
};
export const candidateData = (firstName: any, middleName: any, lastName: any, date: any, email: any, vacancyId: any) => {
  let addClaim: any = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    email: email,
    contactNumber: null,
    keywords: null,
    comment: null,
    dateOfApplication: date,
    consentToKeepData: false,
    vacancyId: vacancyId,
  };
  return addClaim;
};

export const submitClaimData = () => {
  let submitClaim: any = {
    action: "SUBMIT",
  };
  return submitClaim;
};
