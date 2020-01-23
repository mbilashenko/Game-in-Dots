import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getGameSettings, startGame, stopGame } from "../../actions/creators";
import { game } from "../../config";
import { GAME_PLAYERS } from "../../core/Game";
import { appDefaultState, appPropTypes } from "../../reducers/app";
import { apiDefaultState, apiPropTypes } from "../../reducers/api";

import { default as Form } from "../../components/GameInitForm";
import { default as Message } from "../../components/GameMessage";
import { default as Grid } from "../../components/GameGrid";

import "./index.sass";

class Game extends React.Component {
  componentDidMount() {
    // Get list of all game modes (settings)
    this.props.getGameSettings();
  }

  render() {
    const { app, api } = this.props;

    // Detect settings for future game
    const settings =
      Object.keys(app.game).length > 0 && Object.keys(api.settings).length > 0
        ? api.settings[app.game.mode]
        : game.settings;

    // Generate string with winner of game
    const winner =
      app.winner === appDefaultState.winner
        ? ""
        : app.winner === GAME_PLAYERS.COMPUTER
        ? "Computer win"
        : `${app.game.username} win!`;

    return (
      <>
        <Form
          isDisabled={app.isGameStarted}
          startGame={this.props.startGame}
          gameModes={api.settings}
        />
        <Message message={winner} />
        <Grid
          settings={settings}
          username={app.game.username}
          isGameStarted={app.isGameStarted}
          onGameEnded={this.props.stopGame}
        />
      </>
    );
  }
}

Game.propTypes = {
  app: PropTypes.exact(appPropTypes).isRequired,
  api: PropTypes.exact(apiPropTypes).isRequired,
  getGameSettings: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired
};

Game.defaultProps = {
  app: appDefaultState,
  api: apiDefaultState
};

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = { getGameSettings, startGame, stopGame };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
