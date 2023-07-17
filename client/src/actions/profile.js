import { GET_PROFILE, PROFILE_ERROR, LOGIN_FAIL, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT } from "./types";
import { getUserProfile, createUserProfile, addUserExperience, addUserEducation, deleteUserExperience, deleteUserEducation, deleteUserAccount } from "../components/general-utils";
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

// Delete experience
export const deleteExperience = id => async dispatch => {
    const res = await deleteUserExperience(id);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.output
        })
        dispatch(setAlert('Experience Removed', 'success'));
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
    }
}

// Delete experience
export const deleteEducation = id => async dispatch => {
    const res = await deleteUserEducation(id);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.output
        })
        dispatch(setAlert('Education Removed', 'success'));
    }
    else if (res && res.type === "error") {
        dispatch({
            type: PROFILE_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
    }
}

// Delete account and Profile
// deleting from token
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure you want to delete your account?')) {
        const res = await deleteUserAccount();
        if (res && res.type === "success") {
            dispatch({
                type: CLEAR_PROFILE,
            })
            dispatch({
                type: DELETE_ACCOUNT,
            })
            dispatch(setAlert('Your account has been permanantly deleted'));
        }
        else if (res && res.type === "error") {
            dispatch({
                type: PROFILE_ERROR,
                payload: res.output.response.statusText, status: res.output.response.status
            })
        }
    }
}
