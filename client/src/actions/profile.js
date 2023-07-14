import { GET_PROFILE, PROFILE_ERROR, LOGIN_FAIL } from "./types";
import { getUserProfile, createUserProfile } from "../components/general-utils";
import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
    const res = await getUserProfile();
    if (res && res.type === "success") {
        dispatch({
            type: GET_PROFILE,
            payload: res.output
        })
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
    }
}

export const createProfile = (formData, navigate, edit) => async dispatch => {
    const res = await createUserProfile(formData);
    if (res && res.type === "success") {
        dispatch({
            type: GET_PROFILE,
            payload: res.output
        })

        dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created', 'success'));
        if (!edit) {
            navigate('/dashboard');
        }
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
        res.output.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({ type: LOGIN_FAIL })
    }
}