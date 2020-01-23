import React, { useState } from "react";
import PropTypes from "prop-types";

import usePrev from "../../hooks/usePrev";

import "./index.sass";

const SUBMIT_BUTTON_TEXT = {
  PLAY: "Play",
  PLAY_AGAIN: "Play again"
};

const GAME_MODES = {
    easyMode: "Easy Mode",
    normalMode: "Normal Mode",
    hardMode: "Hard Mode"
  };

const GameForm = props => {
  const { gameModes, isDisabled } = props;

  const [submitButtonText, setSubmitButtonText] = useState(
    SUBMIT_BUTTON_TEXT.PLAY
  );

  if (isDisabled) {
    if (submitButtonText === SUBMIT_BUTTON_TEXT.PLAY_AGAIN) {
      setSubmitButtonText(SUBMIT_BUTTON_TEXT.PLAY);
    }
  }

  const prevDisabledOption = usePrev(isDisabled);

  if (prevDisabledOption === true && isDisabled === false) {
    if (submitButtonText === SUBMIT_BUTTON_TEXT.PLAY) {
      setSubmitButtonText(SUBMIT_BUTTON_TEXT.PLAY_AGAIN);
    }
  }

  const onSubmit = event => {
    event.preventDefault();

    if (!isDisabled) {
      const formData = new FormData(event.currentTarget);
      const mode = formData.get("mode");
      const username = formData.get("username");

      if (GAME_MODES.hasOwnProperty(mode) && username !== "") {
        props.startGame({ mode, username });
      } else {
        alert("Hey, you must choose game mode and set username!");
      }
    }
  };

  return (
    <form
      className="game-form"
      encType="multipart/form-data"
      method="post"
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div className="game-form__field select-field">
        <div className="control">
          <div className="select">
            <select
              name="mode"
              className="game-form__select"
              disabled={isDisabled}
            >
              <option hidden>Pick game mode</option>
              {gameModes &&
                Object.keys(gameModes).map((value, index) => (
                  <option key={index} value={value}>
                    {GAME_MODES[value]}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="game-form__field input-field">
        <div className="control">
          <input
            name="username"
            className="game-form__input grey-light input"
            type="text"
            placeholder="Enter your name"
            disabled={isDisabled}
            autoFocus
          />
        </div>
      </div>
      <div className="game-form__field field">
        <div className="control">
          <input
            type="submit"
            className="game-form__submit button"
            value={submitButtonText}
            disabled={isDisabled}
          />
        </div>
      </div>
    </form>
  );
};

GameForm.propTypes = {
  gameModes: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired
};

export default GameForm;
