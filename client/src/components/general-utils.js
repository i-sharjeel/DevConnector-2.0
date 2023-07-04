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

export async function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
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