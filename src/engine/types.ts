/**
 *
 */
export type LobbyGame = {
  id: string;
  description: string;
  players: PlayerId[];
};

/**
 * The entire game state
 */
export type GameState = {
  id: string;
  players: Map<PlayerId, Player>;
  cards: Map<CardId, Card>;
};

export type PlayerId = string;

export type Player = {
  id: PlayerId;
  /** The display name of the player. */
  name: string;
  /** The cards that are in the player's deck. */
  deck: CardId[];
  /** The cards that are in the player's hand. */
  hand: CardId[];
  /** The cards that are on the player's table. */
  table: CardId[];
  /** The cards that are in the player's discard pile. */
  discard: CardId[];
};

export type CardId = string;

/**
 * A card in the game
 */
export type Card = {
  id: CardId;
  /** The name of the card */
  name: string;
  /** The text on the card */
  text: string;
};
