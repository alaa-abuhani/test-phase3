Feature: Candidate Interview
   I Want To Login To Site

   Scenario:   Verify The Admin can successfully transition the candidate's status to  Interview Passed
      Given Admin Login
      Given Creat Employee
      Given Creat Job
      Given Creat Vacancy
      Given Creat Candidate
      When  Recruitment Form Passed
      Then  Check Status Pass

   Scenario: Verify The Admin can successfully transition the candidate's status to Interview Failed
      Given Admin Login
      Given Creat Employee
      Given Creat Job
      Given Creat Vacancy
      Given Creat Candidate
      When  Recruitment Form Failed
      Then  Check Status Fail


