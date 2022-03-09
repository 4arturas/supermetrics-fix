Feature: Data fetch
  Scenario: In the task there is said: to connect the api and fetch the data using given key
    Given Connect API
    When Fetch data
    Then Check if Supermetrics API returns 1000 records