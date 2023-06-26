import axios from 'axios'

export async function createUser(data) {
    if (data) {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(data);
            const res = await axios.post('/api/users', body, config);
            return res.data;

        } catch (error) {
            console.error(error);
        }
    }
}

export function getRandomString(length) {
    let text = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}