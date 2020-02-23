# About this project
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This Project uses the [json server package](https://github.com/typicode/json-server) as an api to make data lookup and storage easy

## Objective
Some of the following specs are more ambiguous in nature. Feel free to interpret those specs in the way that you deem is best.

- Use one of the following frameworks to build the project: React, Angular, or Vue
- Use cat images from http://thecatapi.com/api/images/get?format=xml&results_per_page=25
- Use cat facts from https://catfact.ninja/facts?limit=25. You may need to use a CORS proxy like one of these: cors proxy, cors anywhere.
- Allow users to sort photos alphabetically by the last word in the cat fact
- Allow users to “favorite” an image (with attached fact) and allow users to view only favorited images
- Allow users to view one photo and fact at a time

## json-server
Need to have the json server package downloaded globally 
`npm install -g json-server`

## Start Project
`nf start` will run both `yarn start` and `json-server --watch db.json`

## User Favorites
Since the unique identifier for the user is set on page load, the previous user favorites will not be accessible.
This is because without having some kind of authentication, there is no simple way to identify the user so that their data can persist.


## What I would add?
- Test Coverage! Test coverage is important and with React Testing Library, adding integration tests is much easier
- Pagination. Ideally, if the user keeps scrolling down the page, I would show a loading spinner while fetching a new page of cat data. Once the data is fetched, append the new data to the already visible list. 


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


