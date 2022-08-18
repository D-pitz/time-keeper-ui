import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const startShift = async (userId) => {
    try {
        const resp = await axios.get(`${API_URL}/shifts/start/${userId}`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const getShift = async (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/shifts/${shiftId}`)
        return resp;
    } catch (e) {
        console.log(e);
        return e.response;
    }
}

export const endShift = async (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/shifts/${shiftId}/end`)
        return resp;
    } catch (e) {
        return e.response;
    }
}

export const getUserShifts = async (userId) => {
    try {
        const resp = await axios.get(`${API_URL}/shifts/all/${userId}`)
        return resp;
    } catch (e) {
        return e.response;
    } 
}

export const getActiveShift = async (userId) => {
    try {
        const resp = await axios.get(`${API_URL}/shifts/active/${userId}`);
        return resp;
    } catch (e) {
        console.log(e.response)
        return e.response;
    }
}