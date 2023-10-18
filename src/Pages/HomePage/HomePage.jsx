import * as Styled from './HomePage.style'
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import AreaEstatistica from '../../Components/AreaEstatísticas/AreaEstatisticas';
import {InputSearch}  from '../../Components/InputSearchPaciente/InputSearchPaciente';
import { AuthContext } from '../../Context/auth.context';
import { Navigate } from 'react-router-dom';




export const HomePage = () => {
  
  
  const { setData } = useContext(HeaderContext)
  useEffect(() => {
    setData({       
      titulo: 'ESTATÍSTICAS E INFORMAÇÕES',}) 
      
    }, []);
    
    
    const { auth } = useContext(AuthContext)
  
    const render = () => {
        return (
          <>
          <Styled.MainHome>
           { <AreaEstatistica/>}
           { <InputSearch/>}

          </Styled.MainHome>
          </>
      )
    }

    return auth.isLogged ? render() : <Navigate to={'./login'}/>
    
  }
  


  

