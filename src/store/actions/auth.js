import axios from '../../axios/axios-quiz';
import { AUTH_SUCCES, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDg1TE78lBNbn8yBIXv8LiKAKI09QdnY8s';

        if (isLogin) { // True - будет если пользователь авторизируется
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDg1TE78lBNbn8yBIXv8LiKAKI09QdnY8s'
        }

        const response = await axios.post(url, authData)
        const data = response.data;
        console.log(data)

        const expiresInTime = new Date(new Date().getTime() + data.expiresIn * 1000) // Выводим время окончания сессии

        localStorage.setItem("token", data.idToken)
        localStorage.setItem("userId", data.localId)
        localStorage.setItem("expiresInTime", expiresInTime) // время окончания сессии

        dispatch(authSucces(data.idToken))
        dispatch(authLogout(data.expiresIn)) // Удаляем токен
    }
}

export function authSucces(token) {
    return {
        type: AUTH_SUCCES,
        token
    }
}

export function logout() { // Выходим из системы
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("expiresInTime")
    return {
        type: AUTH_LOGOUT
    }
}

// Функция для автоматическиго входа
export function autoLogin() {
    return dispatch => {
        let token = localStorage.getItem("token") // Если время сессии не закончилось токен еще будет в localStorage
        if (!token) {
            dispatch(logout()) // Если время сессии закончилось - выход из системы
        } else {
            let expiresInTime = new Date( localStorage.getItem("expiresInTime") )
            if (expiresInTime <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSucces(token))
                dispatch(
                    authLogout(  (expiresInTime.getTime() - new Date().getTime()) / 1000 ) // Вычесляем остаток времени в секундах
                )
            }
        }
    }
}

export function authLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout()) // Выходим из системы по окончанию сессии
        }, time * 1000)
    }
}