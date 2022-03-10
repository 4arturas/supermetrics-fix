Feature: Data fetch
  Scenario: In the task there is said: to connect the api and fetch the data using given key, 1000 records will be returned
    Given Connect API
    When Fetch data
    Then Check if Supermetrics API returns 1000 records
    And Data format is consistent