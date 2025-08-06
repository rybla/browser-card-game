"use client";

import { GameState, GameAction, CardZone } from "@/engine/types";
import { defaultDeck } from "@/engine/cards";
import { do_ } from "@/utility";
import { useEffect, useState } from "react";
import * as server from "../../../server";
import styles from "./page.module.css";
import { Hand } from "./components/Hand";
import { Deck } from "./components/Deck";
import { Table } from "./components/Table";
import { Discard } from "./components/Discard";
import { Chat } from "./components/Chat";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useParams } from "next/navigation";
import { getPlayerId } from "@/app/player";

export default function GamePage() {
  const { gameId } = useParams<{ gameId: string }>();

  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    void do_(async () => {
      let gameState = await server.getGameState(gameId);
      if (!gameState) {
        gameState = await server.startGame(gameId);
        setGame(gameState);
      }
    });

    const intervalId = setInterval(() => {
      void do_(async () => {
        setGame(await server.getGameState(gameId));
      });
    }, 1000); // Runs every 1 second
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [gameId]);

  if (!game) {
    return <div>Loading...</div>;
  }

  const playerId = getPlayerId();

  const handleChooseDeck = () => {
    const action: GameAction = {
      name: "CHOOSE_DECK",
      payload: { deck: defaultDeck },
    };
    void server.performGameAction(gameId, playerId, action);
  };

  const handleSendChat = () => {
    if (chatInput.trim() === "") return;
    const action: GameAction = {
      name: "CHAT_MESSAGE",
      payload: chatInput,
    };
    void server.performGameAction(gameId, playerId, action);
    setChatInput("");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      const cardId = active.id as string;
      const to = over.id as CardZone;
      const from = (active.data.current?.zone as CardZone) ?? "hand";

      const action: GameAction = {
        name: "MOVE_CARD",
        payload: { card: cardId, from, to },
      };
      void server.performGameAction(gameId, playerId, action);
    }
  };

  const player = game.players.get(playerId);
  if (!player) {
    return <div>Player not found</div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={styles.page}>
        <div className={styles.title}>Game {game.id}</div>
        {game.stage === "CHOOSE_DECK" && (
          <button onClick={handleChooseDeck}>Choose Deck</button>
        )}
        <div className={styles.players}>
          <h2>Players</h2>
          {/* TODO: Render the UI from the perspective of the current player */}
          {[...game.players.values()].map((player) => (
            <div key={player.id} className={styles.player}>
              <div className={styles.playerName}>{player.name}</div>
              <Deck player={player} />
              {/* TODO: Button that lets the player draw a card from the deck */}
              <Hand player={player} gameState={game} />
              <Table player={player} gameState={game} />
              <Discard player={player} />
            </div>
          ))}
        </div>
        <div className={styles.chatContainer}>
          <Chat gameState={game} />
          <div className={styles.chatInput}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendChat();
                }
              }}
            />
            <button onClick={handleSendChat}>Send</button>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
