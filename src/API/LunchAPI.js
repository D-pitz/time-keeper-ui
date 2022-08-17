import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const startLunch = (shiftId) => {
    try {
        const resp = axios.get(`${API_URL}/lunches/${shiftId}`)
    } catch (e) {
        console.log(e);
    }
}

const endBreak = (shiftId) => {
    try {
        const resp = axios.get(`${API_URL}/lunches/${shiftId}/end`)
    } catch (e) {
        console.log(e);
    }
}