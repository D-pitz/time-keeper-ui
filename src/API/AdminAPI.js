import axios from "axios";

const APP_URL = process.env.REACT_APP_ADMIN_URL

export const createAdmin = async (data) => {
    try {
        console.log(data)
        const resp = await axios.post(`${APP_URL}/users`, data);
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const loginAdmin = async (data) => {
    try {
        const resp = await axios.post(`${APP_URL}/users/login`, data)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const getAllUsers = async () => {
    try {
        const resp = await axios.get(`${APP_URL}/users`)
        return resp;
    } catch (e) {
        console.log(e);
    }
}

export const startShiftAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/shifts/${shiftId}`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const endShiftAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/shifts/${shiftId}/end`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const startLunchAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/lunches/${shiftId}`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const endLunchAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/lunches/${shiftId}/end`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const startBreakAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/breaks/${shiftId}`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const endBreakAdmin = async (shiftId) => {
    try {
        const resp = await axios.get(`${APP_URL}/breaks/${shiftId}/end`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}
