import { Card } from "@/engine/deck";
import styles from "./Card.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CardZone } from "@/engine/types";

export function CardView({ card, zone }: { card: Card; zone: CardZone }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card.id,
      data: {
        zone,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.card}
    >
      <div className={styles.name}>{card.name}</div>
      <div className={styles.text}>{card.text}</div>
    </div>
  );
}
