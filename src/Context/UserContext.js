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
        window.location.reload();
    }

    const getActiveUser = () => {
        const active = localStorage.getItem('user');
        const parsedUser = JSON.parse(active);
        return parsedUser;
    }

    const logout = () => {
        localStorage.clear()
        setUser(null)
    }

    return (
        <Provider value =  {{ user, login, logout, getActiveUser }}> {children} </Provider>
    )
}

export { UserProvider, Consumer as UserConsumer, UserContext }

