import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const startBreak = async (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/breaks/${shiftId}`);
        return resp;
    } catch (e) {
        console.log(e);
    }
}

export const endBreak = (shiftId) => {
    try {
        const resp = axios.get(`${API_URL}/breaks/${shiftId}/end`);
        return resp;
    } catch (e) {
        console.log(e);
    }
}