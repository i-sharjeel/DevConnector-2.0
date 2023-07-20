import { setAlert } from "./alert";
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from "./types";
import { createPost, deleteOnePost, fetchPosts, likePost, unlikePost, fetchPost, createComment, deleteComment } from "../components/general-utils";

// getting all posts
export const getPosts = () => async dispatch => {
    const res = await fetchPosts();
    if (res && res.type === "success") {
        dispatch({
            type: GET_POSTS,
            payload: res.output
        })
    }
    else if (res && res.type === "error") {
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
    }
}

// add like
export const addLike = postID => async dispatch => {
    const res = await likePost(postID);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_LIKES,
            payload: { likes: res.output, postID: postID }
        })
    }
    else if (res && res.type === "error") {
        dispatch(setAlert(res.output.response.data.msg, "danger"))
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
    }
}

// remove like
export const removeLike = postID => async dispatch => {
    const res = await unlikePost(postID);
    if (res && res.type === "success") {
        dispatch({
            type: UPDATE_LIKES,
            payload: { likes: res.output, postID: postID }
        })
    }
    else if (res && res.type === "error") {
        dispatch(setAlert(res.output.response.data.msg, "danger"))
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
    }
}

// delete post
export const deletePost = postID => async dispatch => {
    const res = await deleteOnePost(postID);
    if (res && res.type === "success") {
        dispatch(setAlert('Post Removed', "success"))
        dispatch({
            type: DELETE_POST,
            payload: postID
        })
    }
    else if (res && res.type === "error") {
        dispatch(setAlert('Error Deleting Post', "success"))
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
    }
}

// create a new post
export const addPost = formData => async dispatch => {
    const res = await createPost(formData);
    dispatch(setAlert('Post added', "success"))
    if (res && res.type === "success") {
        dispatch({
            type: ADD_POST,
            payload: res.output
        })
    }
    else if (res && res.type === "error") {
        dispatch(setAlert('Error creating post', "danger"))
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
    }
}

// getting all posts
export const getPost = id => async dispatch => {
    const res = await fetchPost(id);
    if (res && res.type === "success") {
        dispatch({
            type: GET_POST,
            payload: res.output
        })
    }
    else if (res && res.type === "error") {
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.statusText, status: res.output.response.status
        })
    }
}

// add a comment
export const addComment = (postID, formData) => async dispatch => {
    const res = await createComment(postID, formData);
    if (res && res.type === "success") {
        dispatch({
            type: ADD_COMMENT,
            payload: res.output
        })
        dispatch(setAlert('Comment added', "success"))
    }
    else if (res && res.type === "error") {
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
        dispatch(setAlert('Error adding comment', "danger"))
    }
}

// remove a comment
export const removeComment = (postID, commentID) => async dispatch => {
    const res = await deleteComment(postID, commentID);
    if (res && res.type === "success") {
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentID
        })
        dispatch(setAlert('Comment Removed', "success"))
    }
    else if (res && res.type === "error") {
        dispatch({
            type: POST_ERROR,
            payload: res.output.response.data.msg
        })
        dispatch(setAlert('Error adding comment', "danger"))
    }
}
