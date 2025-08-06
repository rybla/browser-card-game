import { GameState, GameAction, Player, Card, CardZone } from "./types";

/**
 * Update the game state in response to an action
 *
 * This function is the core of the game engine. It takes the current game
 * state and an action, and returns the new game state. It is a pure function,
 * meaning that it does not have any side effects.
 *
 * @param gameState The current game state
 * @param action The action to apply
 * @param playerId The ID of the player who performed the action
 * @returns The new game state
 */
export function updateGame(
  gameState: GameState,
  action: GameAction,
  playerId: string,
): GameState {
  switch (action.name) {
    case "CHAT_MESSAGE": {
      return {
        ...gameState,
        chat: [
          ...gameState.chat,
          { player: playerId, message: action.payload },
        ],
      };
    }
    case "CHOOSE_DECK": {
      // Get the player who is choosing their deck
      const player = gameState.players.get(playerId);
      if (!player) {
        return gameState;
      }

      // Create the new cards and add them to the game state
      const newCards = new Map<string, Card>(gameState.cards);
      for (const card of action.payload.deck) {
        newCards.set(card.id, card);
      }

      // Update the player's deck
      const newPlayer: Player = {
        ...player,
        deck: action.payload.deck.map((c) => c.id),
      };
      const newPlayers = new Map(gameState.players);
      newPlayers.set(playerId, newPlayer);

      // If all players have chosen their deck, start the game
      const allPlayersChosenDeck = [...newPlayers.values()].every(
        (p) => p.deck.length > 0,
      );
      const newStage = allPlayersChosenDeck ? "PLAYING" : "CHOOSE_DECK";

      return {
        ...gameState,
        stage: newStage,
        players: newPlayers,
        cards: newCards,
      };
    }
    case "MOVE_CARD": {
      // Get the player who is moving the card
      const player = gameState.players.get(playerId);
      if (!player) {
        return gameState;
      }

      const { card, from, to } = action.payload;

      // Remove the card from the source zone
      const sourceZone = [...player[from]];
      const cardIndex = sourceZone.indexOf(card);
      if (cardIndex === -1) {
        return gameState;
      }
      sourceZone.splice(cardIndex, 1);

      // Add the card to the destination zone
      const destinationZone = [...player[to], card];

      // Create the new player object
      const newPlayer: Player = {
        ...player,
        [from]: sourceZone,
        [to]: destinationZone,
      };

      // Update the players map
      const newPlayers = new Map(gameState.players);
      newPlayers.set(playerId, newPlayer);

      return {
        ...gameState,
        players: newPlayers,
      };
    }
    default:
      return gameState;
  }
}
