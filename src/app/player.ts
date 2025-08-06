"use client";

import Cookies from "js-cookie";

const PLAYER_ID_COOKIE_KEY = "player-id";

export function getPlayerId() {
  let playerId = Cookies.get(PLAYER_ID_COOKIE_KEY);
  if (!playerId) {
    playerId = self.crypto.randomUUID();
    Cookies.set(PLAYER_ID_COOKIE_KEY, playerId);
  }
  return playerId;
}
