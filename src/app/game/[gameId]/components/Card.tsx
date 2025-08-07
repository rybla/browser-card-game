import { Card } from "@/engine/deck";
import styles from "./Card.module.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function CardView({ card }: { card: Card }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

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
