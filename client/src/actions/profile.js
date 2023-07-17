import { GET_PROFILE, PROFILE_ERROR, LOGIN_FAIL, UPDATE_PROFILE } from "./types";
import { getUserProfile, createUserProfile, addUserExperience, addUserEducation } from "../components/general-utils";
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

        dispatch(setAlert(!edit ? 'Profile updated' : 'Profile Created', 'success'));
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

// Add Experience 
export const addExperience = (formData, navigate) => async dispatch => {
    const res = await addUserExperience(formData);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.output
        })
        dispatch(setAlert('Experience Added', 'success'));
        navigate('/dashboard');
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
        res.output.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
}

// Add Education 
export const addEducation = (formData, navigate) => async dispatch => {
    const res = await addUserEducation(formData);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.output
        })
        dispatch(setAlert('Education Added', 'success'));
        navigate('/dashboard');
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
        res.output.response.data.errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
}