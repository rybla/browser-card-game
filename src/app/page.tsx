"use client";

import { LobbyGame } from "@/engine/types";
import { do_ } from "@/utility";
import { useEffect, useState } from "react";
import * as server from "../server";
import styles from "./page.module.css";

export default function Home() {
  const [lobbyGames, setLobbyGames] = useState<LobbyGame[]>([]);

  // every 1 second, update lobbyGames
  useEffect(() => {
    const intervalId = setInterval(() => {
      void do_(async () => {
        setLobbyGames(await server.getLobbyGames());
      });
    }, 1000); // Runs every 1 second
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className={styles.page}>
      <div className={styles.title}>Lobby</div>
      <div className={styles.lobbyGames}>
        {lobbyGames.map((lobbyGame) => (
          <div key={lobbyGame.id}>
            <div className={styles.id}>{lobbyGame.id}</div>
            <div className={styles.description}>{lobbyGame.description}</div>
            <div className={styles.players}>
              {lobbyGame.players.map((playerId) => (
                <div className={styles.playerId} key={playerId}>
                  {playerId}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
