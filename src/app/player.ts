"use client";

import Cookies from "js-cookie";
import { randomUUID } from "crypto";

const PLAYER_ID_COOKIE_KEY = "player-id";

export function getPlayerId() {
  let playerId = Cookies.get(PLAYER_ID_COOKIE_KEY);
  if (!playerId) {
    playerId = randomUUID();
    Cookies.set(PLAYER_ID_COOKIE_KEY, playerId);
  }
  return playerId;
}
