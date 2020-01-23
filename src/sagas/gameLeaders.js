import { call, put, takeLatest } from "redux-saga/effects";

import {
  API_LEADERS_REQUEST,
  API_LEADERS_SUCCESS,
  API_LEADERS_FAILURE
} from "../actions";
import api from "../api";
import createAction from "../actions/creators";

export function* gameLeadersSaga() {
  try {
    const leaders = yield call(api.getLeaders);

    yield put(createAction(API_LEADERS_SUCCESS, leaders.data.reverse()));
  } catch (error) {
    yield put(createAction(API_LEADERS_FAILURE, error));
    alert(error); // BAD PRACTICE / ONLY FOR TEST PROJECT
  }
}

export default function* gameLeadersWatcher() {
  yield takeLatest(API_LEADERS_REQUEST, gameLeadersSaga);
}
