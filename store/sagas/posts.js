import { call, put, select, takeLatest } from "redux-saga/effects";
import { addPostFailure, addPostRequest, addPostSuccess, fetchPostsFailure, fetchPostsSuccess, fetchPostsRequest, upvotePostRequest, upvotePostSuccess, upvotePostFailure, commentRequest, commentSuccess, commentFailure, replyToCommentSuccess, replyToCommentFailure, replyToCommentRequest, likeCommentRequest, likeCommentSuccess, likeCommentFailure, deleteCommentSuccess, deleteCommentFailure, deleteCommentRequest, editPostRequest, editPostSuccess, editPostFailure, deletePostRequest, deletePostSuccess, deletePostFailure, getCommentRepliesSuccess, getCommentRepliesFailure, getCommentRepliesRequest } from "../action/posts";
import { addPostApi, commentApi, deleteCommentApi, deletePosttApi, likeCommentApi, replyCommentApi, updatePostApi, upvotePostApi } from "../../services/apis";
import { defaultHeaders } from "../../constants";
import { sendGet } from "../../src/utils/sendApiRequest";

function* addPostSaga({ payload }) {

    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(addPostApi, payload, headers);
        if (status === "Success") {
            yield put(addPostSuccess(data));
        } else {
            yield put(addPostFailure(apiMessage));
        }
    } catch (error) {
        yield put(addPostFailure(error));
    }
}

function* fetchPostsSaga({ payload }) {
    try {
        const headers = {
            ...defaultHeaders,
        }
        const endPoint = `post/all-posts`

        const url = payload?._id ? `${endPoint}?user_id=${payload?._id}` : endPoint
        const { data: { status, message: apiMessage, data } } = yield call(sendGet(url), headers);
        if (status === "Success") {
            yield put(fetchPostsSuccess(data));
        } else {
            yield put(fetchPostsFailure(apiMessage));
        }
    } catch (error) {
        yield put(fetchPostsFailure(error));
    }
}

function* upvotePostSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(upvotePostApi, payload, headers);
        if (status === "Success") {
            yield put(upvotePostSuccess(data));
        } else {
            yield put(upvotePostFailure(apiMessage));
        }
    } catch (error) {
        yield put(upvotePostFailure(error));
    }

}

function* commentSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(commentApi, payload, headers);
        if (status === "Success") {
            yield put(commentSuccess(data));
        } else {
            yield put(commentFailure(apiMessage));
        }
    } catch (error) {
        yield put(commentFailure(error));
    }
}

function* replyToCommentSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(replyCommentApi, payload, headers);

        if (status === "Success") {
            yield put(replyToCommentSuccess(data));
        } else {
            yield put(replyToCommentFailure(apiMessage));
        }
    } catch (error) {
        yield put(replyToCommentFailure(error));
    }
}

function* likeCommentSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(likeCommentApi, payload, headers);
        if (status === "Success") {
            yield put(likeCommentSuccess(data));
        } else {
            yield put(likeCommentFailure(apiMessage));
        }
    } catch (error) {
        yield put(likeCommentFailure(error));
    }
}

function* deleteCommentSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(deleteCommentApi, payload, headers);
        if (status === "Success") {
            yield put(deleteCommentSuccess(data));
        } else {
            yield put(deleteCommentFailure(apiMessage));
        }
    } catch (error) {
        yield put(deleteCommentFailure(error));
    }
}

function* editPostSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage, data } } = yield call(updatePostApi, payload, headers);
        if (status === "Success") {
            yield put(editPostSuccess(data));
        } else {
            yield put(editPostFailure(apiMessage));
        }
    } catch (error) {
        yield put(editPostFailure(error));
    }
}


function* deletePostSaga({ payload }) {
    try {
        const token = yield select((state) => state.login.loginResponse.token);
        const headers = {
            ...defaultHeaders,
            token,
        }
        const { data: { status, message: apiMessage } } = yield call(deletePosttApi, payload, headers);
        if (status === "Success") {
            yield put(deletePostSuccess(payload._id));
        } else {
            yield put(deletePostFailure(apiMessage));
        }
    } catch (error) {
        yield put(deletePostFailure(error));
    }
}

function* fetchCommentRepliesSaga({ payload }) {
    try {
        const headers = {
            ...defaultHeaders,
        }
        const endPoint = `comment/${payload.post_id}/comment/${payload.comment_id}`

        const { data: { status, message: apiMessage, data } } = yield call(sendGet(endPoint), headers);
        if (status === "Success") {
            yield put(getCommentRepliesSuccess({ payload, data }));
        } else {
            yield put(getCommentRepliesFailure(apiMessage));
        }
    } catch (error) {
        yield put(getCommentRepliesFailure(error));
    }
}


export default function* rootSaga() {
    yield takeLatest(addPostRequest, addPostSaga);
    yield takeLatest(fetchPostsRequest, fetchPostsSaga);
    yield takeLatest(upvotePostRequest, upvotePostSaga);
    yield takeLatest(commentRequest, commentSaga);
    yield takeLatest(replyToCommentRequest, replyToCommentSaga);
    yield takeLatest(likeCommentRequest, likeCommentSaga);
    yield takeLatest(deleteCommentRequest, deleteCommentSaga);
    yield takeLatest(editPostRequest, editPostSaga)
    yield takeLatest(deletePostRequest, deletePostSaga);
    yield takeLatest(getCommentRepliesRequest, fetchCommentRepliesSaga);
}