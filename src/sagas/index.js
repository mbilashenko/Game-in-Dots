import { all, fork } from "redux-saga/effects";

import gameSettingsWatcher from "./gameSettings";
import gameWinnerWatcher from "./gameWinner";
import gameLeaders from "./gameLeaders";

export default function* rootSaga() {
  yield all([
    fork(gameSettingsWatcher),
    fork(gameWinnerWatcher),
    fork(gameLeaders)
  ]);
}
