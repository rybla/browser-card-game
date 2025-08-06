import { Player } from "@/engine/types";
import styles from "./Discard.module.css";
import { useDroppable } from "@dnd-kit/core";

export function Discard({ player }: { player: Player }) {
  const { setNodeRef } = useDroppable({
    id: "discard",
  });
  return (
    <div className={styles.discard} ref={setNodeRef}>
      <h3>Discard</h3>
      <div>{player.discard.length} cards</div>
    </div>
  );
}
