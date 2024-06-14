# Overview

----

## About The Application
### Directory Structure
- _configs_ - contains configurations for Jest, PostCss, TypeScript, and Webpack
- _src_ - contains all necessary code for app development (the files in this directory get processed for the build)
- _tests_ - contains test data and test utilities. This directory holds coverage files as well (```__coverage__``` - git ignored)

----

## Requirements
+ Node 18.16.0 or higher
+ NPM 9.5.1 or higher
+ Operating System: Mac OSX 10.13 or higher/Windows 8 or higher

----

## Installation
Open a terminal, navigate to the root directory of this repository, and type the command **npm install**.

----

## Development
### Scripts
+ **npm start:** Starts webpack dev server on localhost port 8080
+ **npm run build:** Creates a new build folder
+ **npm test:** Runs the Jest test runner (currently ~90% coverage)

### Workflow
#### development mode
- Run the command **npm start**
- A browser window should open at http://localhost:8080
- The React application should run
- As you work on the application, changes are propagated to the browser.

#### production mode
- Run the command **npm run build**
