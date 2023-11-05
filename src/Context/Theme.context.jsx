import { createContext } from 'react';
import { useState } from 'react';

export const ThemeContext = createContext ({
    theme: {
        cores: {
            primary: "#483D8B",    
            second: "#ffff",  
        }, 


    }, setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        cores: {
            primary: "#483D8B",
            second: "#ffff",            
        }, 

    });


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};