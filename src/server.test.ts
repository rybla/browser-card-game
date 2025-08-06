import {
  getLobbyGames,
  submitLobbyGame,
  joinLobbyGame,
  getLobbyGame,
  resetLobbyGames,
} from './server';

describe('server', () => {
  beforeEach(() => {
    resetLobbyGames();
  });

  it('should return an empty array of lobby games initially', async () => {
    const games = await getLobbyGames();
    expect(games).toEqual([]);
  });

  it('should create a new lobby game', async () => {
    const newGame = await submitLobbyGame({ description: 'Test Game' }, 'player1');
    expect(newGame.description).toBe('Test Game');
    expect(newGame.players).toEqual(['player1']);

    const games = await getLobbyGames();
    expect(games).toHaveLength(1);
    expect(games[0]).toEqual(newGame);
  });

  it('should join an existing lobby game', async () => {
    const newGame = await submitLobbyGame({ description: 'Test Game' }, 'player1');
    await joinLobbyGame(newGame.id, 'player2');

    const game = await getLobbyGame(newGame.id);
    expect(game?.players).toEqual(['player1', 'player2']);
  });

  it('should not add a player to a game they are already in', async () => {
    const newGame = await submitLobbyGame({ description: 'Test Game' }, 'player1');
    await joinLobbyGame(newGame.id, 'player1');

    const game = await getLobbyGame(newGame.id);
    expect(game?.players).toEqual(['player1']);
  });

  it('should not do anything if the game does not exist when trying to join', async () => {
    await joinLobbyGame('non-existent-game', 'player1');
    const games = await getLobbyGames();
    expect(games).toEqual([]);
  });

  it('should return a specific lobby game', async () => {
    const newGame = await submitLobbyGame({ description: 'Test Game' }, 'player1');
    const game = await getLobbyGame(newGame.id);
    expect(game).toEqual(newGame);
  });

  it('should return undefined if the game does not exist', async () => {
    const game = await getLobbyGame('non-existent-game');
    expect(game).toBeUndefined();
  });
});
