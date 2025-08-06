"use client";

import * as server from "@/server";
import { useState } from "react";
import styles from "./page.module.css";
import { getPlayerId } from "../player";
import { useRouter } from "next/navigation";

export default function Page() {
  const [description, setDescription] = useState("");
  const router = useRouter();

  async function submit() {
    const playerId = getPlayerId();
    const newGame = await server.submitLobbyGame({ description }, playerId);
    router.push(`/game/${newGame.id}`);
  }

  return (
    <div className={styles.page}>
      <div className={styles.title}>New Game</div>
      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles.button} onClick={() => void submit()}>
        Submit
      </button>
    </div>
  );
}
