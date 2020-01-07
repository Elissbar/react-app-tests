import { FETCH_QUIZ_START, FETCH_QUIZ_SUCCES, FETCH_QUIZ_ERROR } from '../actions/actionTypes';

const initialState = {
    quizes: [],
    loading: false,
    error: null
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_QUIZ_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZ_SUCCES:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case FETCH_QUIZ_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }

}