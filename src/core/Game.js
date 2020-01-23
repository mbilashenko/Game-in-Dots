import { game } from "../config";
import getRandomNumber from "../utils/getRandomNumber";

const {
  settings: { delay, field },
  limit: { maxFields, minFields }
} = game;

// Game events
export const GAME_EVENTS = {
  GAME_START: "GAME_START",
  GAME_END: "GAME_END",
  STATE_CHANGE: "STATE_CHANGE",
  ROUND_START: "ROUND_START",
  ROUND_END: "ROUND_END"
};

// Game states
export const GAME_STATES = {
  PLAYING: "PLAYING",
  NOT_STARTED: "NOT_STARTED",
  ENDED: "ENDED"
};

// Game cell states
export const GAME_CELL_STATES = {
  PENDING: "PENDING"
};

// Game players
export const GAME_PLAYERS = {
  USER: "User",
  COMPUTER: "Computer"
};

/**
 * Game class (uses event system for working)
 */
export default class Game extends EventTarget {
  // Delay before crediting it to computer score
  #delay = delay;

  // Grid size
  #size = field;

  // Game status
  #status = GAME_STATES.NOT_STARTED;

  // Game score
  #score = {};

  // Game cell timer
  #timerID;

  // Game winner
  #winner;

  // Available grid for round
  #availableGrid;

  // Game grid
  #grid;

  /**
   * @constructor
   * @param {number} size - grid size
   * @param {number} delay - delay before crediting it to computer score
   */
  constructor(size, delay) {
    super();

    // Set `size` field
    if (!isNaN(size) && size >= minFields && size <= maxFields) {
      this.#size = size;
    }

    // Set `delay` field
    this.#delay = delay;

    // Create new grid
    this.#create();
  }

  /**
   * Start game
   * @returns {Game}
   */
  start() {
    // Start game only if it's not started yet
    if (this.#status !== GAME_STATES.PLAYING) {
      this.#dispatch(GAME_EVENTS.GAME_START);

      // Fires every time when round ends
      this.addEventListener(GAME_EVENTS.ROUND_END, this.#round);

      // Start round
      this.#round();

      // Change game status
      this.#status = GAME_STATES.PLAYING;
    }

    return this;
  }

  /**
   * Controller for user input cell index
   * @param {number} gridIndex - cell index
   * @returns {Game}
   */
  userInput(gridIndex) {
    // If grid cell status is `pending` - add it to a user's score
    if (this.#grid[gridIndex] === GAME_CELL_STATES.PENDING) {
      this.#setRoundWinner(GAME_PLAYERS.USER);
      this.#dispatch(GAME_EVENTS.ROUND_END);
    }

    return this;
  }

  /**
   * Get score
   */
  get score() {
    return this.#score;
  }

  /**
   * Get game status
   */
  get status() {
    return this.#status;
  }

  /**
   * Get game winner
   */
  get winner() {
    return this.#winner;
  }

  /**
   * Get grid
   */
  get grid() {
    return this.#grid;
  }

  /**
   * Create game grid and reset some values before starting new game
   */
  #create = () => {
    this.#grid = Array.from(new Array(this.#size ** 2).keys());
    this.#availableGrid = this.#grid;

    this.#score[GAME_PLAYERS.USER] = 0;
    this.#score[GAME_PLAYERS.COMPUTER] = 0;
    this.#winner = undefined;
  };

  /**
   * Start game round
   */
  #round = () => {
    // Check if game has winner
    if (this.#hasGameWinner()) {
      this.#setGameWinner();

      this.#dispatch(GAME_EVENTS.GAME_END);
      this.#status = GAME_STATES.ENDED;

      this.#create();
      return;
    }

    this.#dispatch(GAME_EVENTS.ROUND_START);

    // Pick random cell for this round
    this.#pickRandomCell();

    // Timeout before crediting it to computer score
    this.#timerID = setTimeout(() => {
      this.#setRoundWinner(GAME_PLAYERS.COMPUTER);

      this.#dispatch(GAME_EVENTS.ROUND_END);
    }, this.#delay);
  };

  /**
   * Pick random cell
   */
  #pickRandomCell = () => {
    // Filter all not played cells
    this.#availableGrid = this.#grid.filter(value => !isNaN(value));

    // Get random cell
    const randomCell = getRandomNumber(0, this.#availableGrid.length - 1);

    // Set random cell to `pending` status
    this.#grid[this.#availableGrid[randomCell]] = GAME_CELL_STATES.PENDING;

    this.#dispatch(GAME_EVENTS.STATE_CHANGE);
  };

  /**
   * Set round winner
   * @param {string} winner
   */
  #setRoundWinner = winner => {
    // Get pending cell
    const pendingElementIndex = this.#grid.indexOf(GAME_CELL_STATES.PENDING);

    // If pending cell was found
    if (~pendingElementIndex) {
      this.#grid[pendingElementIndex] = winner;
      this.#score[winner]++; // add plus one to winner score

      clearTimeout(this.#timerID);
      this.#timerID = null;

      this.#dispatch(GAME_EVENTS.STATE_CHANGE);
    }
  };

  /**
   * Set game winner
   */
  #setGameWinner = () => {
    this.#winner = Object.entries(this.#score).sort(
      (a, b) => b[1] - a[1]
    )[0][0];
  };

  /**
   * Does the game have a winner?
   * @returns {boolean}
   */
  #hasGameWinner = () =>
    Object.entries(this.#score).some(value => value[1] > this.#grid.length / 2);

  /**
   * Service method for dispatching event
   * @param {string} event
   * @returns {boolean}
   */
  #dispatch = event => this.dispatchEvent(new Event(event));
}
