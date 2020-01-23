import {
  API_GAME_SETTINGS_REQUEST,
  API_GAME_WINNER_REQUEST,
  API_LEADERS_REQUEST,
  APP_GAME_START
} from "./index";

export const getGameSettings = () => createAction(API_GAME_SETTINGS_REQUEST);

export const startGame = ({ mode, username }) =>
  createAction(APP_GAME_START, { mode, username });

export const stopGame = winner => createAction(API_GAME_WINNER_REQUEST, winner);

export const getLeaders = () => createAction(API_LEADERS_REQUEST);

/**
 * Action creator for app
 * @param {string} type
 * @param {*} payload?
 * @returns {{payload: *, type: *}}
 */
const createAction = (type, payload) => ({ type, payload });

export default createAction;
