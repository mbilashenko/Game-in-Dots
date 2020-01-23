import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

import Game, { GAME_EVENTS, GAME_PLAYERS } from "../../core/Game";
import usePrev from "../../hooks/usePrev";

import "./index.sass";

const GameGrid = props => {
  const {
    settings: { field, delay },
    username
  } = props;

  const game = useMemo(() => new Game(field, delay), [field, delay]);

  const [grid, updateGrid] = useState(game.grid);

  const prevIsGameStarted = usePrev(props.isGameStarted);

  const gameBoardClickHandler = event =>
    game.userInput(event.target.getAttribute("data-id"));

  // Start game
  if (props.isGameStarted && prevIsGameStarted === false) {
    game.start();
  }

  useEffect(() => {
    // Grid state updater
    const updateGridHandler = () => updateGrid([...game.grid]);

    // Start game (if needed on mounting)
    if (props.isGameStarted) {
      game.start();
      updateGridHandler();
    }

    // Fires when game ended
    const gameOverHandler = () => {
      const winner =
        game.winner === GAME_PLAYERS.USER ? username : GAME_PLAYERS.COMPUTER;

      props.onGameEnded(winner);
      updateGridHandler();
    };

    // Update game grid every time when game state was changed
    game.addEventListener(GAME_EVENTS.STATE_CHANGE, updateGridHandler);
    // Fires when game emit `GAME_END` event
    game.addEventListener(GAME_EVENTS.GAME_END, gameOverHandler);

    return () => {
      // Don't forget to unsubscribe on unmounting
      game.removeEventListener(GAME_EVENTS.STATE_CHANGE, updateGridHandler);
      game.removeEventListener(GAME_EVENTS.GAME_END, gameOverHandler);
    };
    // eslint-disable-next-line
  }, [game, username]);

  return (
    <ul
      className={`game-grid game-grid--size-${props.settings.field}`}
      onClick={gameBoardClickHandler}
    >
      {grid.map((value, index) => (
        <li
          key={index}
          data-id={index}
          className={
            isNaN(value)
              ? `game-grid__cell game-grid__cell--${value.toLowerCase()}`
              : null
          }
        />
      ))}
    </ul>
  );
};

GameGrid.propTypes = {
  settings: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
  onGameEnded: PropTypes.func.isRequired
};

GameGrid.defaultProps = {
  username: ""
};

export default GameGrid;
