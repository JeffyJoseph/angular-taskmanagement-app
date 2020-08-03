# AngularTaskmanagementApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Hosted url

https://angular-taskmanagement-app.herokuapp.com/
Credentials: 
email - email@example.com
password - 2kf8210d0

## Development server

Unzip and put in local directory
Navigate to backend (I have added the dist folderto backend public so that both are accessible in single port)
Run npm install
Run node app.js
Navigate to http://localhost:5000/

## Approach and what have done

All basic functionalities are done
If navigated to unknown url, error page is displayed (additional feature)
App can be installed 
In Phone, app can be added to homescreen as mobile application
Lighthouse requirements are met and 100% best practices are used
Backend API is fetched using a node interface

## Some better practices that could be done

 UI perfection
 Guard can be used(I have added it, to show how to use it).
 NgRX can be used to manage the state of application. However as we have only two page and 2 API this isn't necessary.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
