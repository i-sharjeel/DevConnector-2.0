import { setAlert } from "./alert";
import { createUser, authenticateUser, loginUser } from "../components/general-utils";
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from "./types";
import { setAuthToken } from "../components/general-utils";

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    const result = await authenticateUser();
    if (result && result.type === "success") {
        dispatch({
            type: USER_LOADED,
            payload: result.output
        })
    }
    else if (result && result.type === "error") {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    const body = JSON.stringify({ name, email, password })
    const result = await createUser(body);
    if (result && result.type === "success") {
        dispatch({ type: REGISTER_SUCCESS, payload: result.output });
        dispatch(loadUser())
    }

    else if (result && result.type === "error") {
        result.output.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({ type: REGISTER_FAIL })
    }
}

// Login User
export const login = ({ email, password }) => async (dispatch) => {
    const body = JSON.stringify({ email, password })
    const result = await loginUser(body);
    if (result && result.type === "success") {
        dispatch({ type: LOGIN_SUCCESS, payload: result.output });
        dispatch(loadUser());
    }

    else if (result && result.type === "error") {
        result.output.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({ type: LOGIN_FAIL })
    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
}