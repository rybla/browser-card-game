"use server";

import { randomUUID } from "crypto";
import { LobbyGame } from "./engine/types";

const lobbyGames: LobbyGame[] = [];

export async function getLobbyGames(): Promise<LobbyGame[]> {
  return lobbyGames;
}

export async function submitLobbyGame(
  lobbyGame: Omit<LobbyGame, "id">,
): Promise<void> {
  lobbyGames.push({ ...lobbyGame, id: randomUUID() });
}
