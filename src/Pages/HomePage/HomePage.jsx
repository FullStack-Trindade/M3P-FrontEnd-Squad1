import * as Styled from './HomePage.style'
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import AreaEstatistica from '../../Components/AreaEstatísticas/AreaEstatisticas';
import {InputSearch}  from '../../Components/InputSearchPaciente/InputSearchPaciente';
import { InputSearchUser } from '../../Components/InputSearchUser/InputSearchUser';
import { AuthContext } from '../../Context/auth.context';
import { Navigate } from 'react-router-dom';




export const HomePage = () => {
  
  const { tokenUser, setTokenUser } = useContext(AuthContext);
  const localToken = JSON.parse(localStorage.getItem('token'));

  useEffect(() => { 
      if (localToken !== null) {
          fetchAuth() 
      }
  }, [localToken]);

  const fetchAuth = async() => {
      const authToken = await AuthService.Get();
      const tokenExists = authToken.filter(auth => auth.token_user === localToken);

      if (tokenExists.length === 0) { return }
      
      setTokenUser(tokenExists[0]?.token_user);
  }
  
  const { setData } = useContext(HeaderContext)
  useEffect(() => {
    setData({       
      titulo: 'ESTATÍSTICAS E INFORMAÇÕES',}) 
      
    }, []);
    
    
/*     const { auth } = useContext(AuthContext) */
  
    const render = () => {
        return (
          <>
          <Styled.MainHome>
           { <AreaEstatistica/>}
           { <InputSearchUser/>}
           { <InputSearch/>}

          </Styled.MainHome>
          </>
      )
    }

/*     return auth.isLogged ? render() : <Navigate to={'./login'}/> */
    return !!tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
  }
  


  

