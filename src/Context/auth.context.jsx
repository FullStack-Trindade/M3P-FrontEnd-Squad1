import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({
    idUser: null,
    setIdUser: () => {},
    tokenUser: null,
    setTokenUser: () => {},
    idType: null,
    setIdType: () => {}
});

export const AuthProvider = ({ children }) => {
    const [idUser, setIdUser] = useState();
    const [tokenUser, setTokenUser] = useState();
    const [idType, setIdType] = useState();
    
    return (
        <AuthContext.Provider 
            value={{ idUser, setIdUser, tokenUser, setTokenUser, idType, setIdType }}
        >
            { children }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}