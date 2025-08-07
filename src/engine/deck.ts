import { z } from "zod";

/**
 * A card in the game
 */
export type Card = {
  id: string;
  /** The name of the card */
  name: string;
  /** The text on the card */
  text: string;
};

export const cardSchema = z.object({
  name: z.string(),
  text: z.string(),
});

export const deckSchema = z.object({
  name: z.string(),
  cards: z.array(cardSchema),
});

export type Deck = z.infer<typeof deckSchema>;
