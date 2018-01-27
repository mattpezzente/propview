# Portfolio V - React Property Viewer

## Overview
Property Viewer is an application that runs completely on the client-side, being powered by React JS. It was made as a demonstration of my ability to implement React JS to create a small, yet dynamic, application, using purely client-side code (JS, SASS, etc.).

The application itself, is a property viewing utility, that is designed to take in a property address, and return results and listing information based on the address given. It also implements a GPS feature, that gets the user's current location, and displays information of the address he/she is currently at.

## Demo

[PropView Demo](https://salogost.github.io/propview/ "PropView Demo")

## Technology

#### Languages
* JS (ES6)
* SASS / CSS
* HTML

#### Framework
* React JS

#### Packages
* axios (HTTP client for API calls)
* currency-formatter 
* xml-js (XML to JS Object converter)
* parse-address
* gh-pages


## Images

#### Landing page of the site that provides a randomized background image on every load. This page gives the search actions for the users to find property data for inputed addresses, or their current location.

![alt text](https://github.com/salogost/propview/blob/master/assets/action_1.png?raw=true "Landing page prompt, with search actions")

#### Loading indiciator for when a search is in progress.

![alt text](https://github.com/salogost/propview/blob/master/assets/action_2.png?raw=true "Loading indicator for when search is in progress")

#### Fully loaded page of property details.

![alt text](https://github.com/salogost/propview/blob/master/assets/action_3.png?raw=true "Full page detail of returned property data")

## Installation

To install and run this project locally, you'll need to have Node Package Manager (npm) installed on your local machine.

To download this repo, run:
```
git clone https://github.com/salogost/propview.git
```

To install Node packages
```
npm install
```

Lastly run:
```
npm run
```