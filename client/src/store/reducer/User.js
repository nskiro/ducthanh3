import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../utility';

const initUserState = {
    token: '',
    dept: '',
    error: null,
    loading: false
}

const authSuccess = (state, action) => {
    return updateObject(state,{
        token: String(action.token),
        dept: action.dept,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state,{
        token: '',
        dept: '',
        error: action.error,
        loading: false
    })
}

const logout = (state, action) => {
    return updateObject(state,initUserState);
}

const setLoading = (state, action) => {
    return updateObject(state,{
        error: null,
        loading: true
    })
}

const reducer = ( state = initUserState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return logout(state, action);
        case actionTypes.AUTH_START: return setLoading(state, action);
        default:
            return state;
    }
};

export default reducer;