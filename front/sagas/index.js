import {
  all,
  fork,
  call,
  take,
  put,
  delay,
  debounce,
  throttle,
  takeLatest,
  takeEvery,
  takeLeading,
  takdMaybe,
} from "redux-saga/effects";
import axios from "axios";

function loginAPI(data) {
  return axios.post("/api/login", data);
}

function* logIn(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      typs: "LOGIN_IN_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      typs: "LOGIN_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/api/login");
}

function* logOut() {
  try {
    yield delay(2000);
    // const result = yield call(logOutAPI);
    yield put({
      typs: "LOGIN_OUT_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      typs: "LOGIN_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* addPost(action) {
  try {
    yield delay(2000);
    // const result = yield call(addPostAPI, action.data);
    yield put({
      typs: "ADD_POST_SUCCESS",
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      typs: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest("LOG_IN_REQUEST", logIn); // 이 한줄만 쓰면 한번만 실행되고 다음부터는 실행되지 않는다 -> while로 감싸준다!
}

function* watchLogOut() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* rootSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut), fork(watchAddPost)]);
}
