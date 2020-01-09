import axios from '../../axios/axios-quiz';
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCES,
    FETCH_QUIZES_ERROR,
    NEXT_ANSWER_STATE,
    IS_FINISHED_QUIZ,
    NEXT_QUIZ_SET,
    UPDATE_SET_STATE,
    GET_QUIZ_COMPONENT,
    // RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('https://react-quiz-559fd.firebaseio.com/quizes.json');

            let quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            dispatch(fetchQuizesSucces(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSucces(quizes) {
    return {
        type: FETCH_QUIZES_SUCCES,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

// ---------------------------------------

export function quizAnswerNext(answerState, results) {
    return {
        type: NEXT_ANSWER_STATE,
        answerState, results
    }
}

export function nextQuizSet(AnswerNumber) {
    return {
        type: NEXT_QUIZ_SET,
        AnswerNumber
    }
}

export function isFinishedQuiz() {
    return {
        type: IS_FINISHED_QUIZ
    }
}

export function updateSetState() {
    return {
        type: UPDATE_SET_STATE
    }
}

export function getQuizComponent(quiz) {
    return {
        type: GET_QUIZ_COMPONENT,
        quiz
    }
}

export function retryQuiz() {
    return dispatch => {
        dispatch(updateSetState())
    }
}

export function renderQuiz(id) {
    return async dispatch => {
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;

            dispatch(getQuizComponent(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesById(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'succes') {
                return
            }
        }

        const question = state.quiz[state.AnswerNumber];
        const results = state.results;
        if (question.rightAnswerId == answerId) {

            if (!results[question.id]) {
                results[question.id] = 'succes';
            }

            dispatch(quizAnswerNext({ [answerId]: 'succes' }, results))

            const timeout = window.setTimeout(() => {

                if (isQuizFinished(state)) {
                    dispatch(isFinishedQuiz())
                } else {
                    dispatch(nextQuizSet(state.AnswerNumber + 1))
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error';
            dispatch(quizAnswerNext({ [answerId]: 'error' }, results))
        }
    }
}

function isQuizFinished(state) {
    return state.quiz.length === state.AnswerNumber + 1;
}