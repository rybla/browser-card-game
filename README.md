# browser-card-game

## Introduction

This project is an implementation of a browser-based multiplayer card game. Here's how it works:

- The index of the app has a lobby of all games. Each game is either waiting for more players or is in progress.
- Any player can create a new game to add to the lobby. The player then waits for other players to join. Then, they can start the game.
- Once the game starts, each player gets to choose their deck to play with.
- In the game, the players can move cards (via click-and-drag) around between the various zones (deck, hand, table, discard), and can chat with the other players in the game.
- The game ends if a player leaves the game.

## Technology Stack

- using the Typescript language
- using the `npm` package manager
- using the NextJS application framework
- using Firebase for app hosting, user data management, and authentication

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Organization

The directory `src/engine` contains the logic for how to updated the game state in respones to player actions.

The directory `src/app` contains the frontend application code. This includes the lobby web page (which is the index of the web app) and the game web page.

The file `src/server.ts` conains the backend application code. This includes managing the lobby and processing ongoing games in response to requests sent from the frontend. Here, we use server functions (which are async functions exported from modules that have "use server" at the top) as a more convenient protocol for making requests to the server rather than raw requests using `fetch`.
