import axios from '../../axios/axios-quiz';
import {FETCH_QUIZ_START, FETCH_QUIZ_SUCCES, FETCH_QUIZ_ERROR} from './actionTypes';

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
        type: FETCH_QUIZ_START
    }
}

export function fetchQuizesSucces(quizes) {
    return {
        type: FETCH_QUIZ_SUCCES,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZ_ERROR,
        error: e
    }
}