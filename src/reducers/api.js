import PropTypes from "prop-types";

import {
  API_GAME_SETTINGS_SUCCESS,
  API_GAME_WINNER_SUCCESS,
  API_LEADERS_SUCCESS
} from "../actions";

export const apiDefaultState = {
  settings: {},
  leaders: []
};

export const apiPropTypes = {
  settings: PropTypes.object.isRequired,
  leaders: PropTypes.array.isRequired
};

export default (state = apiDefaultState, action) => {
  switch (action.type) {
    case API_GAME_SETTINGS_SUCCESS:
      return { ...state, settings: action.payload };

    case API_LEADERS_SUCCESS:
      return { ...state, leaders: action.payload };

    case API_GAME_WINNER_SUCCESS:
      return { ...state, leaders: action.payload };

    default:
      return state;
  }
};
