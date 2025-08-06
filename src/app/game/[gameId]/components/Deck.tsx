import { Player } from "@/engine/types";
import styles from "./Deck.module.css";
import { useDroppable } from "@dnd-kit/core";

export function Deck({ player }: { player: Player }) {
  const { setNodeRef } = useDroppable({
    id: "deck",
  });
  return (
    <div className={styles.deck} ref={setNodeRef}>
      <h3>Deck</h3>
      <div>{player.deck.length} cards</div>
    </div>
  );
}
