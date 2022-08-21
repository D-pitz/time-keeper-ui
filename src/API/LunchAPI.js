import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const startLunch = async (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/lunches/${shiftId}`)
        return resp;
    } catch (e) {
        console.log(e);
    }
}

export const endLunch = async (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/lunches/${shiftId}/end`)
        return resp;
    } catch (e) {
        console.log(e);
    }
}