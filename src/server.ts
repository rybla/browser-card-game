"use server";

import { randomUUID } from "crypto";
import { LobbyGame } from "./engine/types";

const lobbyGames: LobbyGame[] = [];

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

export function resetLobbyGames() {
  lobbyGames.length = 0;
}
