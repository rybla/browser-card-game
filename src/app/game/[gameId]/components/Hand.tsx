import { GameState, Player } from "@/engine/types";
import styles from "./Hand.module.css";
import { CardView } from "./Card";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

export function Hand({
  player,
  gameState,
}: {
  player: Player;
  gameState: GameState;
}) {
  const { setNodeRef } = useDroppable({
    id: "hand",
  });
  return (
    <div className={styles.hand} ref={setNodeRef}>
      <h3>Hand</h3>
      <SortableContext items={player.hand} strategy={rectSortingStrategy}>
        <div className={styles.cards}>
          {player.hand.map((cardId) => {
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
