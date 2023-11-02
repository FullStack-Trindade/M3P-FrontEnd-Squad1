import * as Styled from './HomePage.style'
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';
import { AuthService } from '../../Service/Auth.service';
import AreaEstatistica from '../../Components/AreaEstatísticas/AreaEstatisticas';
import { InputSearch } from '../../Components/InputSearchPaciente/InputSearchPaciente';
//import { InputSearchUser } from '../../Components/InputSearchUser/InputSearchUser';
import { InputSearchAtHome } from '../../Components/InputUserSearchAtHome/InputUserSearchAtHome';

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
      
    const render = () => {
        return (
          <>
          <Styled.MainHome>
           { <AreaEstatistica/>}
           { <InputSearchAtHome/>}
           {/* <InputSearch/>*/}

          </Styled.MainHome>
          </>
      )
    }

    return !!tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
  }
  


  

