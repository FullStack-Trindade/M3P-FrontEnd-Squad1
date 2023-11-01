import PropTypes from 'prop-types';
import { createContext, useState } from "react";

export const AuthContext = createContext({
    idDatabase: null,
    setIdDatabase: () => {},
    idUser: null,
    setIdUser: () => {},
    tokenUser: '',
    setTokenUser: () => {},
    idType: null,
    setIdType: () => {}
});

export const AuthProvider = ({ children }) => {
    const [idDatabase, setIdDatabase] = useState();
    const [idUser, setIdUser] = useState();
    const [tokenUser, setTokenUser] = useState();
    const [idType, setIdType] = useState();

    
    return (
        <AuthContext.Provider 
            value={{ 
                idDatabase, 
                setIdDatabase, 
                idUser, 
                setIdUser, 
                tokenUser, 
                setTokenUser, 
                idType, 
                setIdType
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node,
}