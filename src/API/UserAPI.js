import axios from 'axios';

const APP_URL = process.env.REACT_APP_API_URL

export const createUser = async (data) => {
    try {
        console.log(APP_URL)
        const resp = await axios.post(
            `${APP_URL}/users`, data
        )
        return resp;
    } catch (e) {
        console.log(e)
    }
}

export const userLogin = async (data) => {
    try {
        const resp =  await axios.post(
            `${APP_URL}/users/login`, data
        )
        console.log("RESP ___________ ", resp)
        return resp;
    } catch (e) {
        console.log(e)
    }
}

export const getUser = async (userId) => {
    try {
        return await axios.get(
            `${APP_URL}/users/${userId}`
        )
    } catch (e) {
        console.log(e);
    }
}

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(
            `${APP_URL}/users/${userId}`
        )
    } catch (e) {
        console.log(e);
    }
}