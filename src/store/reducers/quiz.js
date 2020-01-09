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
} from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    AnswerNumber: 0,  // Выступает счетчиком при прохождении по массиву
    answerState: null,   // Правильный или неправильный выбор ответа
    isFinished: false, // Конец опроса
    results: {},      // Общее кол-во правильных ответов
    quiz: null
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCES:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case NEXT_ANSWER_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            }
        case IS_FINISHED_QUIZ:
            return {
                ...state, isFinished: true
            }
        case NEXT_QUIZ_SET:
            return {
                ...state, AnswerNumber: action.AnswerNumber, answerState: null
            }
        case UPDATE_SET_STATE:
            return {
                ...state,
                AnswerNumber: 0,
                isFinished: false,
                answerState: null,
                results: {}
            }
        case GET_QUIZ_COMPONENT:
            return {
                ...state, quiz: action.quiz, loading: false
            }
        default:
            return state
    }

}