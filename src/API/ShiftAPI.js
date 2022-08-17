import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const startShift = (userId) => {
    try {
        const resp = await axios.get(`${API_URL}/start/${userId}`)
    } catch (e) {
        console.log(e);
    }
}

const getShift = (shiftId) => {
    try {
        const resp = await axios.get(`${API_URL}/${shiftId}`)
    } catch (e) {
        console.log(e);
    }
}

const endShift = (shiftId) => {
    try {
        const resp = await axios.delete(`${API_URL}/${shiftId}`)
    } catch (e) {
        console.log(e);
    }
}