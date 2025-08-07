import { updateGame } from "./game";
import { GameState, GameAction, Player } from "./types";
import { Card } from "./deck";
import { defaultDeck } from "./cards";

describe("updateGame", () => {
  let initialState: GameState;

  beforeEach(() => {
    const player1: Player = {
      id: "player1",
      name: "Player 1",
      deck: [],
      hand: [],
      table: [],
      discard: [],
    };
    const player2: Player = {
      id: "player2",
      name: "Player 2",
      deck: [],
      hand: [],
      table: [],
      discard: [],
    };
    initialState = {
      id: "game1",
      stage: "CHOOSE_DECK",
      players: new Map([
        ["player1", player1],
        ["player2", player2],
      ]),
      cards: new Map(),
      chat: [],
    };
  });

  it("should handle CHAT_MESSAGE", () => {
    const action: GameAction = {
      name: "CHAT_MESSAGE",
      payload: "Hello, world!",
    };
    const newState = updateGame(initialState, action, "player1");
    expect(newState.chat).toHaveLength(1);
    expect(newState.chat[0]).toEqual({
      player: "player1",
      message: "Hello, world!",
    });
  });

  it("should handle CHOOSE_DECK", () => {
    const action: GameAction = {
      name: "CHOOSE_DECK",
      payload: {
        deck: defaultDeck,
      },
    };
    const newState = updateGame(initialState, action, "player1");
    const player1 = newState.players.get("player1");
    expect(player1?.deck).toHaveLength(defaultDeck.length);
    expect(newState.cards.size).toBe(defaultDeck.length);
    expect(newState.stage).toBe("CHOOSE_DECK");

    // a second player chooses their deck
    const finalState = updateGame(newState, action, "player2");
    const player2 = finalState.players.get("player2");
    expect(player2?.deck).toHaveLength(defaultDeck.length);
    expect(finalState.stage).toBe("PLAYING");
  });

  it("should handle MOVE_CARD", () => {
    // First, player 1 chooses a deck
    const chooseDeckAction: GameAction = {
      name: "CHOOSE_DECK",
      payload: {
        deck: defaultDeck,
      },
    };
    let state = updateGame(initialState, chooseDeckAction, "player1");
    let player1 = state.players.get("player1");
    if (!player1) {
      throw new Error("player not found");
    }

    // Now, move a card from deck to hand
    const cardToMove = player1.deck[0];
    const moveAction: GameAction = {
      name: "MOVE_CARD",
      payload: {
        card: cardToMove,
        from: "deck",
        to: "hand",
      },
    };
    state = updateGame(state, moveAction, "player1");
    player1 = state.players.get("player1");
    if (!player1) {
      throw new Error("player not found");
    }

    expect(player1.deck).not.toContain(cardToMove);
    expect(player1.hand).toContain(cardToMove);
  });

  it("should handle DRAW_CARD", () => {
    // First, player 1 chooses a deck
    const chooseDeckAction: GameAction = {
      name: "CHOOSE_DECK",
      payload: {
        deck: defaultDeck,
      },
    };
    let state = updateGame(initialState, chooseDeckAction, "player1");
    let player1 = state.players.get("player1");
    if (!player1) {
      throw new Error("player not found");
    }

    const cardToDraw = player1.deck[0];

    // Now, draw a card
    const drawAction: GameAction = {
      name: "DRAW_CARD",
      payload: {},
    };
    state = updateGame(state, drawAction, "player1");
    player1 = state.players.get("player1");
    if (!player1) {
      throw new Error("player not found");
    }

    expect(player1.deck).not.toContain(cardToDraw);
    expect(player1.hand).toContain(cardToDraw);
  });
});
