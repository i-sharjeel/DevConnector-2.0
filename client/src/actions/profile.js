// import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";
import { getUserProfile } from "../components/general-utils";

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