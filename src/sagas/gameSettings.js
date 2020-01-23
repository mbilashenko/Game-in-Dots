import { call, put, takeLatest } from "redux-saga/effects";

import {
  API_GAME_SETTINGS_FAILURE,
  API_GAME_SETTINGS_REQUEST,
  API_GAME_SETTINGS_SUCCESS
} from "../actions";
import api from "../api";
import createAction from "../actions/creators";

export function* gameSettingsSaga() {
  try {
    const settings = yield call(api.getGameSettings);

    yield put(createAction(API_GAME_SETTINGS_SUCCESS, settings.data));
  } catch (error) {
    yield put(createAction(API_GAME_SETTINGS_FAILURE, error));
    alert(error); // BAD PRACTICE / ONLY FOR TEST PROJECT
  }
}

export default function* gameSettingsWatcher() {
  yield takeLatest(API_GAME_SETTINGS_REQUEST, gameSettingsSaga);
}
