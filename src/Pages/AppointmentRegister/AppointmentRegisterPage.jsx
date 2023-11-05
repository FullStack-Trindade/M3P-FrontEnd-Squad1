import * as Styled from './AppointmentRegisterPage.style';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthService } from '../../Service/Auth.service';
import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';
import { InputSearchAppointment } from '../../Components/InputSearchAppointment/InputSearchAppointment';

export const AppointmentRegisterPage = () => {
  const { tokenUser, setTokenUser } = useContext(AuthContext);
  const localToken = JSON.parse(localStorage.getItem('token'));

  const [loading, setLoading] = useState();

  useEffect(() => { 
      if (localToken !== null) {
          setLoading(true);
          fetchAuth();
      }
  }, [localToken]);

  const fetchAuth = async() => {
    const authToken = await AuthService.Get();
    const tokenExists = await authToken.filter(auth => auth.token_user === localToken);

      if (tokenExists.length > 0) { 
        setTokenUser(tokenExists[0]?.token_user);
        setLoading(false);
      }

    }

  const { setData } = useContext(HeaderContext)

  useEffect(() => {
    setData({ titulo: 'CADASTRO DE CONSULTA' })
  }, []);

  const render = () => {
      return (
        <>
          <Styled.RegisterArea>
            <Styled.Title>
              <InputSearchAppointment/>
            </Styled.Title>
          </Styled.RegisterArea>
        </>
      )
  }
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
}