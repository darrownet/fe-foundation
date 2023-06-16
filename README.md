# Overview

----

## About The Application
### Application Description
This React application is built with a focus on the separation of concerns and control over the build system. I have leveraged Webpack for the builds, providing a local build, a production build, and a common object shared by both. The application architecture follows a directory structure divided into two main concepts: **components** and **core** (found in the ```src``` directory). The ```components``` directory houses the direct presentation concerns in TypeScript (.tsx), while the ```core``` directory contains the business logic concerns in TypeScript (.ts).

To streamline the styling process, I have utilized Sass for CSS preprocessing. Common styling concerns can be found in the ```src/styles``` directory. However, I believe in treating React components as first-class citizens, and as such, each component has its associated .scss file. This approach promotes modularity and encapsulation.

For efficient state management, I have incorporated Redux. I have taken an unconventional approach to handle action creator functions. Rather than directly importing them into components, I dynamically provide the action creators to any component at runtime using a React Context. Although this implementation is less straightforward from a conventional perspective, it allows for greater flexibility and re-usability of the action creators throughout the application—it just takes some getting used to.

In addition to the action creators, a singleton-like data service is implemented and provided via the React Context as well. This data service is a wrapper for Axios and is provided an Axios configuration at instantiation.

### Directory Structure
- _configs_ - contains configurations for Jest, PostCss, TypeScript, and Webpack
- _src_ - contains all necessary code for app development (the files in this directory get processed for the build)
- _tests_ - contains test data and test utilities. This directory holds coverage files as well (```__coverage__``` - git ignored)

### Future Development
In the future, I'd integrate functionality that allows loading a configuration file after Just-in-Time (JIT) compilation to manage application settings. This feature would enable dynamic configuration of the application without requiring a recompilation. For instance, a config file could provide important information such as the API base URL or available routes. By loading this config file at runtime, the application can easily adapt to different environments or settings without the need for code changes.

Additionally, the current data service implementation is limited to handling only GET requests. In the future I'd implement other HTTP methods such as POST, PUT, and DELETE as well. This expansion would make the data service more robust and versatile, enabling the application to meet a broader set of requirements.

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
+ **npm test:** Runs the Jest test runner (currently ~98% coverage)

### Workflow
#### development mode
- Run the command **npm start**
- A browser window should open at http://localhost:8080
- The React application should run
- As you work on the application, changes are propagated to the browser.

#### production mode
- Run the command **npm run build**

----

## Running The Production Application
- Open a terminal and navigate to the build directory.
- Run any web server (ex. _python3 -m http.server_. This will serve the build at http://localhost:8000).
- Open up a web browser and navigate to http://localhost:8000
