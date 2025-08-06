"use client";

import { LobbyGame } from "@/engine/types";
import { do_ } from "@/utility";
import { useEffect, useState } from "react";
import * as server from "../../../server";
import styles from "./page.module.css";

export default function GamePage({ params }: { params: { gameId: string } }) {
  const [game, setGame] = useState<LobbyGame | undefined>(undefined);
  const { gameId } = params;

  useEffect(() => {
    const intervalId = setInterval(() => {
      void do_(async () => {
        setGame(await server.getLobbyGame(gameId));
      });
    }, 1000); // Runs every 1 second
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>Game {game.id}</div>
      <div className={styles.description}>{game.description}</div>
      <div className={styles.players}>
        <h2>Players</h2>
        {game.players.map((playerId) => (
          <div key={playerId} className={styles.playerId}>
            {playerId}
          </div>
        ))}
      </div>
    </div>
  );
}
