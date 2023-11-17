Feature: Candidate Interview uploade file
    Scenario: Application Initiated status
        Given  Admin login
        Given Create Employee
        Given Create job
        Given Create Vacancy
        Given Create Candidate
        When Upload the file
        Then Check upload file should contain the same data as was uploaded


    Scenario:  Hired status
        Given  Admin login
        Given Create Employee
        Given Create job
        Given Create Vacancy
        Given Create Candidate to Hired
        When Upload the file
        Then Check upload file should contain the same data as was uploaded