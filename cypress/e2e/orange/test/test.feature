Feature: Candidate Interview
   I Want To Login To Site

   Scenario: Pass Interview
      Given Admin Login
      Given Creat Employee
      Given Creat Job
      Given Creat Vacancy
      Given Creat Candidate
      When  Recruitment Form Passed
      Then  Check Status Pass

   Scenario: Reject Interview
      Given Admin Login
      Given Creat Employee
      Given Creat Job
      Given Creat Vacancy
      Given Creat Candidate
      When  Recruitment Form Failed
      Then  Check Status Fail


