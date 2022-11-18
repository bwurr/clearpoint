# clearpoint
temporary repository for technical test from Clearpoint

Issues encountered on setup:
1: Old version of docker resulting in the following message: "Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version"

Resolution: Upgraded Docker to latest version

2: On running docker-compose up am now getting the following connection error: "error during connect: Get "https://192.168.99.100:2376/v1.24/containers/json?all=1&filters=%7B%22label%22%3A%7B%22com.docker.compose.project%3Dsre-assessment%22%3Atrue%7D%7D": dial tcp 192.168.99.100:2376: connectex: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond."

Resolution: This can't be resolved at the moment. Will look to see if I can script some tests as an outline anyway based on the api endpoints

