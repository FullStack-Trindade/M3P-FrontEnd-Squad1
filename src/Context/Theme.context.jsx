import { createContext } from 'react';
import { useState } from 'react';

export const ThemeContext = createContext ({
    theme: {
        cores: {
            primary: "#852354",    
            second: "#541216",  
        }, 

    }, setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        cores: {
            primary: "#852354",
            second: "#541216",            
        }, 

    });


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};