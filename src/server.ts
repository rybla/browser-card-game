"use server";

import { randomUUID } from "crypto";
import {
  LobbyGame,
  GameState,
  GameAction,
  Player,
  PlayerId,
} from "./engine/types";
import { updateGame } from "./engine/game";

const lobbyGames: LobbyGame[] = [];
const activeGames = new Map<string, GameState>();

export async function getLobbyGames(): Promise<LobbyGame[]> {
  return lobbyGames;
}

export async function submitLobbyGame(
  lobbyGame: Omit<LobbyGame, "id" | "players">,
  playerId: string,
): Promise<LobbyGame> {
  const newGame = { ...lobbyGame, id: randomUUID(), players: [playerId] };
  lobbyGames.push(newGame);
  return newGame;
}

export async function joinLobbyGame(
  gameId: string,
  playerId: string,
): Promise<void> {
  const game = lobbyGames.find((g) => g.id === gameId);
  if (game && !game.players.includes(playerId)) {
    game.players.push(playerId);
  }
}

export async function getLobbyGame(gameId: string): Promise<LobbyGame | undefined> {
  return lobbyGames.find((g) => g.id === gameId);
}

export async function startGame(gameId: string): Promise<GameState> {
  const lobbyGameIndex = lobbyGames.findIndex((g) => g.id === gameId);
  if (lobbyGameIndex === -1) {
    throw new Error("Game not found");
  }
  const lobbyGame = lobbyGames[lobbyGameIndex];
  lobbyGames.splice(lobbyGameIndex, 1);

  const players = new Map<PlayerId, Player>();
  for (const playerId of lobbyGame.players) {
    players.set(playerId, {
      id: playerId,
      name: `Player ${playerId}`,
      deck: [],
      hand: [],
      table: [],
      discard: [],
    });
  }

  const newGame: GameState = {
    id: gameId,
    stage: "CHOOSE_DECK",
    players,
    cards: new Map(),
    chat: [],
  };
  activeGames.set(gameId, newGame);
  return newGame;
}

export async function getGameState(
  gameId: string,
): Promise<GameState | undefined> {
  return activeGames.get(gameId);
}

export async function performGameAction(
  gameId: string,
  playerId: string,
  action: GameAction,
): Promise<void> {
  const gameState = activeGames.get(gameId);
  if (!gameState) {
    return;
  }
  const nextGameState = updateGame(gameState, action, playerId);
  activeGames.set(gameId, nextGameState);
}
