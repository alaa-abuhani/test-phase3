Feature: Candidate Interview uploade file
    Scenario: Application Initiated
        Given  Admin login
        Given Creat Employee
        Given Creat job
        Given Creat Vacancy
        Given Creat Candidate
        When upload the file
        # Then The uploaded file should contain the same data as was uploaded
        Then Check upload file


    Scenario:  Hired statuses
        Given  Admin login
        Given Creat Employee
        Given Creat job
        Given Creat Vacancy
        Given Creat Candidate to Hired
        # When Change the candidate status
        When upload the file
        #     Then The uploaded file should contain the same data as was uploaded
        Then Check upload file