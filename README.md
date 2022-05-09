# card-deck

A simple card games library for simulating all sort of card games.

### Project Setup

- Node v17.9.0
- `Volta` Nodejs manager (you can use any Node version manageer of choice.)
- `yarn` form managing packages

### Development

- make a new `.env` file from the `.env.example` file. Be sure to update the new `.env` file with the correct values
- ensure you have `yarn` installed
- also ensure that you have docker running locally
- run `yarn install`
- run `docker-compose up`

### API Endpoints

- `/deck/create` to create a new deck
- `/deck/open` to open a dec
- `/deck/draw` to draw a card

### Running Tests

- `yarn test:integration` to run integration tests
- `yarn test:unit` to run unit tests

### Debugging

A debbugger is configured into vscode to debug the application right from the within the running docker container. Be
sure to install the `Trigger Tasks On Save` vscode extension to use the debugger.
