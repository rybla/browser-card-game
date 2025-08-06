import { GameState } from "@/engine/types";
import styles from "./Chat.module.css";

export function Chat({ gameState }: { gameState: GameState }) {
  return (
    <div className={styles.chat}>
      <h3>Chat</h3>
      <div className={styles.messages}>
        {gameState.chat.map((chatMessage, i) => (
          <div key={i}>
            <b>{chatMessage.player}</b>: {chatMessage.message}
          </div>
        ))}
      </div>
    </div>
  );
}
