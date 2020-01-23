import PropTypes from "prop-types";

import {
  API_GAME_SETTINGS_REQUEST,
  API_GAME_SETTINGS_SUCCESS,
  API_GAME_WINNER_REQUEST,
  API_LEADERS_REQUEST,
  API_LEADERS_SUCCESS,
  APP_GAME_START
} from "../actions";

export const appDefaultState = {
  isGameStarted: false,
  game: {},
  winner: "",
  loading: {
    gameSettings: false,
    leaderBoard: false
  }
};

export const appPropTypes = {
  isGameStarted: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
  winner: PropTypes.string.isRequired,
  loading: PropTypes.exact({
    gameSettings: PropTypes.bool.isRequired,
    leaderBoard: PropTypes.bool.isRequired
  })
};

export default (state = appDefaultState, action) => {
  switch (action.type) {
    case API_GAME_SETTINGS_REQUEST:
      return { ...state, loading: { ...state.loading, gameSettings: true } };

    case API_GAME_SETTINGS_SUCCESS:
      return { ...state, loading: { ...state.loading, gameSettings: false } };

    case API_LEADERS_REQUEST:
      return { ...state, loading: { ...state.loading, leaderBoard: true } };

    case API_LEADERS_SUCCESS:
      return { ...state, loading: { ...state.loading, leaderBoard: false } };

    case APP_GAME_START:
      return {
        ...state,
        winner: appDefaultState.winner,
        isGameStarted: true,
        game: action.payload
      };

    case API_GAME_WINNER_REQUEST:
      return {
        ...state,
        winner: action.payload,
        isGameStarted: false
      };

    default:
      return state;
  }
};
