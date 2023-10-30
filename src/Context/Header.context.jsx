import { createContext, useState } from 'react';
import PropTypes from "prop-types";

export const HeaderContext = createContext({
    dataCard: {
        titulo: '',
    },
    setData: () => {},
});

export const HeaderProvider = ({ children }) => {
    const [data, setData] = useState({
        titulo: 'Aguarde...',
<<<<<<< HEAD
=======
       
>>>>>>> develop
    });

    return(
        <HeaderContext.Provider value={{data, setData}}>
<<<<<<< HEAD
            { children }
=======
         { children }
>>>>>>> develop
        </HeaderContext.Provider>
    )
};

    HeaderProvider.propTypes = {
<<<<<<< HEAD
        children: PropTypes.node.isRequired,
}; 
=======
       children: PropTypes.node.isRequired,
 }; 
>>>>>>> develop
