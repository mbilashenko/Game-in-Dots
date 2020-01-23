import { call, put, takeLatest } from "redux-saga/effects";

import {
  API_GAME_WINNER_FAILURE,
  API_GAME_WINNER_REQUEST,
  API_GAME_WINNER_SUCCESS
} from "../actions";
import api from "../api";
import createAction from "../actions/creators";

export function* gameWinnerSaga(action) {
  try {
    const d = new Date();
    const time = d.toLocaleString("en-GB", { timeStyle: "short" });
    const date = d.toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const request = yield call(api.sendWinner, {
      winner: action.payload,
      date: `${time}; ${date}`
    });

    yield put(createAction(API_GAME_WINNER_SUCCESS, request.data.reverse()));
  } catch (error) {
    yield put(createAction(API_GAME_WINNER_FAILURE, error));
    alert(error); // BAD PRACTICE / ONLY FOR TEST PROJECT
  }
}

export default function* gameWinnerWatcher() {
  yield takeLatest(API_GAME_WINNER_REQUEST, gameWinnerSaga);
}
