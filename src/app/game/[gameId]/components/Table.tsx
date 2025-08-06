import { GameState, Player } from "@/engine/types";
import styles from "./Table.module.css";
import { CardView } from "./Card";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export function Table({
  player,
  gameState,
}: {
  player: Player;
  gameState: GameState;
}) {
  const { setNodeRef } = useDroppable({
    id: "table",
  });
  return (
    <div className={styles.table} ref={setNodeRef}>
      <h3>Table</h3>
      <SortableContext items={player.table} strategy={rectSortingStrategy}>
        <div className={styles.cards}>
          {player.table.map((cardId) => {
            const card = gameState.cards.get(cardId);
            if (!card) {
              return null;
            }
            return <CardView key={card.id} card={card} />;
          })}
        </div>
      </SortableContext>
    </div>
  );
}
