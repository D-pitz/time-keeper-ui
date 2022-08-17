import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const startBreak = (shiftId) => {
    try {
        const resp = axios.get(`${API_URL}/breaks/${shiftId}`)
    } catch (e) {
        console.log(e);
    }
}

const endBreak = (shiftId) => {
    try {
        const resp = axios.get(`${API_URL}/breaks/${shiftId}/end`)
    } catch (e) {
        console.log(e);
    }
}