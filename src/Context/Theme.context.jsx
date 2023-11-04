import { createContext } from 'react';
import { useState } from 'react';

export const ThemeContext = createContext ({
    theme: {
        cores: {
            primary: "#fff",
            secondary: "#fff",
        }, 
        nomeEmpresa: "a empresa",
        urlImage: null,

    }, setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        cores: {
            primary: "#852354",
            secondary: "#854236",
        }, 
   
        urlImage: null,
    });


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};