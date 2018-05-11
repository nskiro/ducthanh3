import axios from '../../axiosInst';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,dept) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        dept: dept
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 14400000); //14400000
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (authData) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/user/login',authData)
            .then(res => {
                if(res.data){
                    localStorage.setItem('token',res.data.token);
                    localStorage.setItem('dept',res.data.dept);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                    dispatch(authSuccess(res.data.token,res.data.dept));
                    dispatch(checkAuthTimeout());
                }
                else{
                    throw res.data.msg;
                }
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            });
    }
}