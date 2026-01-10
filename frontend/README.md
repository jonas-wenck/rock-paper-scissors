# Angular frontend

The Angular frontend serves the interface to the users.

# Architecture

The Angular app declares one service, the `GameService`. This service encapsulates all API calls against the
backend-for-frontend. Server errors are caught and logged by the service before throwing a generic error so that the
view components can display `ErrorPopUp` components.

We have 3 primary routes/views:

- the `Home`-component uses the `PlayerConfig` so that the user can initially choose a username
- the `Game`-component covers the selection of a symbol and the uses the `Result`-component to display the game result
- the `GameRecords`-component displays all available game records to the user

# Libraries

To quickly deliver an accessible and user-friendly frontend, we use the proven components from
the [Angular Material UI component library](https://material.angular.dev/). For layouting the frontend and simpler UI
elements, we use [Tailwind](https://tailwindcss.com/). This combination of powerful libraries allowed us to focus on the
application logic instead of creating core components like buttons from scratch.

# Project setup

Node >= 24 is required to run the application locally. To install the dependencies, run `npm install`. Then start the
app in dev-mode with `npm start`.