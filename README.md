# clearpoint
temporary repository for technical test from Clearpoint

RUNNING THE TESTS
1: In the Cypress Test Runner
> Open a terminal window
> Execute the following command: npm run cy:open
> In the cypress runner select Chrome to open the spec window
> Select the spec and run the test by double clicking
> Results will be output in the test runner. If you need to debug, click on the steps to see the output in the Chrome devtools console window

2: Running the test headless
> Open a terminal window
> Execute the following command: npm run cy:run

OUTLINE OF PROCESS FOR THE ASSESSMENT
Issues encountered on setup:
1: Old version of docker resulting in the following message: "Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version"

Resolution: Upgraded Docker to latest version

2: On running docker-compose up am now getting the following connection error: "error during connect: Get "https://192.168.99.100:2376/v1.24/containers/json?all=1&filters=%7B%22label%22%3A%7B%22com.docker.compose.project%3Dsre-assessment%22%3Atrue%7D%7D": dial tcp 192.168.99.100:2376: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."

Resolution: This can't be resolved at the moment. Will look to see if I can script some tests as an outline anyway based on the api endpoints
Update: Have tried again on Saturday morning and unfortunately still blocked

3: Have been able to open the backend project using visual studio via iis express and can interact with the swagger page and the service directly

--------------------------------------------------------
Test Process
1: Using cypress api create the base project, add to git, create the first test file
2: Explored opening the back end project in visual studio (community edition) and was able to load in the backend portion of the project and open the swagger page using iis express
3: Strategy - happy path of all main endpoints, and some exploration of any variations
Ideally each test would do one thing and one thing well so each of the endpoint actions would be isolated and self contained. 

However, as the system data source potentially opens in a blank state each time it's run I've decided a combined path of create/get, create/update/get, create/delete/get might be the best approach, complemented with get not found, update on article not there, delete article not there




4: Exploration of negative happy path - how do the endpoints handle bad input etc

--------------------------------------------------------
Adjustments needed based on running locally:
1: Localhost is no longer 3000 so had to use the port as it appears on the service locally

--------------------------------------------------------
Outcome:
Project and test feature with tests covering the main happy path flows

--------------------------------------------------------
Further enhancements:
1: Look to add to a pipeline that would deploy the service and run the tests on deployment
2: If further environments are available extend the pipeline to run the tests in every environment, and create a non invasive smoke pack based on attributes to potentially run in prod

--------------------------------------------------------
Alternative Approach:
1: Xunit tests with an http client e.g. flurl included in the project
2: Tests can run in pipeline either in build or release




