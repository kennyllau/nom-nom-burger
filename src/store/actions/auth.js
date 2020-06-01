import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        dispatch(authSuccess(authData)); // hardcode success

        let url = '/';

        if (isSignup)
            url = '/something'

    // axios.post(url, authData)
    //     .then(response => {
    //         dispatch(authSuccess(authData))
    //     })
    //     .catch(error => {
    //         dispatch(authFail(error));
    //     });
    };
};