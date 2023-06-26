// import { v5 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from "./types";
import { getRandomString } from "../components/general-utils";

export const setAlert = (msg, alertType) => dispatch => {
    const id = getRandomString(12);
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    })

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};