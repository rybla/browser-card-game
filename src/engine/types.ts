/**
 *
 */
export type LobbyGame = {
  id: string;
  description: string;
  players: PlayerId[];
};

/**
 * A message in the game's chat
 */
export type ChatMessage = {
  /** The player who sent the message. */
  player: PlayerId;
  /** The content of the message. */
  message: string;
};

/**
 * The state of a particular game
 */
export type GameState = {
  id: string;
  stage: GameStage;
  players: Map<PlayerId, Player>;
  cards: Map<CardId, Card>;
  chat: ChatMessage[];
};

/**
 * The stage of the game
 */
export type GameStage = "CHOOSE_DECK" | "PLAYING" | "GAME_OVER";

/**
 * An action that a player can take in the game
 */
export type GameAction =
  | {
      name: "CHOOSE_DECK";
      payload: {
        deck: Card[];
      };
    }
  | {
      name: "MOVE_CARD";
      payload: {
        card: CardId;
        from: CardZone;
        to: CardZone;
      };
    }
  | {
      name: "CHAT_MESSAGE";
      payload: string;
    };

/**
 * A place where a card can be
 */
export type CardZone = "deck" | "hand" | "table" | "discard";

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

import { Card } from "./deck";

export type CardId = string;
