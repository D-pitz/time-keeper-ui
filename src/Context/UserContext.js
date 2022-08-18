import React, { useState, setState } from 'react';

const UserContext = React.createContext();
const { Provider, Consumer } = UserContext;

const UserProvider = ({children}) => {
    const [user, setUser] = useState({
        id: "",
        role: "",
        isLogin: false
    })

    const login = (user)  => { 
        setUser({
            id: user.id,
            role: user.role,
            isLogin: user.isLogin
        })   
        localStorage.setItem('user',JSON.stringify(user));
    }

    return (
        <Provider value =  {{ user, login, logout, getActiveUser }}> {children} </Provider>
    )
}

export const getActiveUser = () => {
    const active = localStorage.getItem('user');
    const parsedUser = JSON.parse(active);
    return parsedUser;
}

export const logout = () => {
    localStorage.clear();
}

export const userObj = () => {
    let userObj = {
        id: "",
        role: "",
        isLogin: false
    }
    return userObj;
}

export const ProcessError = (e) => {
    return e.data.error
}

export { UserProvider, Consumer as UserConsumer, UserContext }

