"use client";

import { LobbyGame } from "@/engine/types";
import * as server from "@/server";
import { useState } from "react";
import styles from "./page.module.css";

export default function Page() {
  const [lobbyGame, setLobbyGame] = useState<Omit<LobbyGame, "id">>({
    description: "",
    players: [],
  });

  async function submit() {
    await server.submitLobbyGame(lobbyGame);
    // TODO: enter a waiting state where the player waits for other players to enter their game
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>New Game</div>
      <textarea
        className={styles.textarea}
        value={lobbyGame.description}
        onChange={(e) =>
          setLobbyGame({ ...lobbyGame, description: e.target.value })
        }
      />
      <button className={styles.button} onClick={() => void submit()}>
        Submit
      </button>
    </div>
  );
}
