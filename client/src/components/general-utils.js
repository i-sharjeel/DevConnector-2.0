import axios from 'axios'
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export function getRandomString(length) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export async function createUser(body) {
    try {
        const res = await axios.post('/api/users', body, config);
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    }

    catch (e) {
        const errors = e.response.data.errors;
        if (errors) {
            return { output: errors, type: "error" };
        }
    }
}

export async function loginUser(body) {
    try {
        const res = await axios.post('/api/auth', body, config);
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    }

    catch (e) {
        const errors = e.response.data.errors;
        if (errors) {
            return { output: errors, type: "error" };
        }
    }
}

export async function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        console.log("token: ", token)
    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export async function authenticateUser() {
    try {
        const res = await axios.get('/api/auth')
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function getUserProfile() {
    try {
        const res = await axios.get('/api/profile/me')
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function getAllProfiles() {
    try {
        const res = await axios.get('/api/profile')
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function getProfileByUserID(id) {
    try {
        const res = await axios.get(`/api/profile/user/${id}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function getGithubRepos(username) {
    try {
        const res = await axios.get(`/api/profile/github/${username}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function createUserProfile(formData) {
    try {
        const res = await axios.post('/api/profile', formData, config)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function addUserExperience(formData) {
    try {
        const res = await axios.put('/api/profile/experience', formData, config)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function addUserEducation(formData) {
    try {
        const res = await axios.put('/api/profile/education', formData, config)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function deleteUserExperience(id) {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function deleteUserEducation(id) {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function deleteUserAccount() {
    try {
        const res = await axios.delete(`/api/profile`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function fetchPosts() {
    try {
        const res = await axios.get(`/api/posts`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}


export async function fetchPost(id) {
    try {
        const res = await axios.get(`/api/posts/${id}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function likePost(id) {
    try {
        const res = await axios.put(`/api/posts/like/${id}`);
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function unlikePost(id) {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`);
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function deleteOnePost(id) {
    try {
        const res = await axios.delete(`/api/posts/${id}`);
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function createPost(formData) {
    try {
        const res = await axios.post('/api/posts', formData, config)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function createComment(postID, formData) {
    try {
        const res = await axios.post(`/api/posts/comment/${postID}`, formData, config)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}

export async function deleteComment(postID, commentID) {
    try {
        const res = await axios.delete(`/api/posts/comment/${postID}/${commentID}`)
        if (res && res.data) {
            return { output: res.data, type: "success" };
        }
    } catch (error) {
        return { output: error, type: "error" };
    }
}