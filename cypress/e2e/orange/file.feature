Feature: Candidate Interview uploade file
    Scenario: Application Initiated
        Given  Admin login
        Given Create Employee
        Given Create job
        Given Create Vacancy
        Given Create Candidate
        When upload the file
        # Then The uploaded file should contain the same data as was uploaded
        Then Check upload file


    Scenario:  Hired statuses
        Given  Admin login
        Given Create Employee
        Given Create job
        Given Create Vacancy
        Given Create Candidate to Hired
        # When Change the candidate status
        When upload the file
        #     Then The uploaded file should contain the same data as was uploaded
        Then Check upload file