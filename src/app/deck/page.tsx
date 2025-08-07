"use client";

import { useState } from "react";
import { Deck, deckSchema } from "@/engine/deck";
import styles from "./page.module.css";

export default function DeckPage() {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const parsedDeck = deckSchema.parse(json);
      setDeck(parsedDeck);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setDeck(null);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Upload a Deck</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      {error && <div className={styles.error}>{error}</div>}
      {deck && (
        <div className={styles.deck}>
          <h2 className={styles.deckName}>{deck.name}</h2>
          <ul className={styles.cardList}>
            {deck.cards.map((card, index) => (
              <li key={index} className={styles.card}>
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardText}>{card.text}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
