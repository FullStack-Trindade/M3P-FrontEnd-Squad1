import * as Styled from './AppointmentRegisterPage.style';
// import { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// import { HeaderContext } from '../../Context/Header.context';
import { FormAppointment } from '../../Components/FormAppointment/FormAppointment';

export const AppointmentRegisterPage = () => {
  // const isLogged = JSON.parse(localStorage.getItem('isLogged'));

  // const { data, setData } = useContext(HeaderContext)

  // useEffect(() => {
  //   setData({ titulo: 'CADASTRO DE CONSULTA' })
  // }, []);

  const render = () => {
      return (
        <>
          <Styled.RegisterArea>
            {/* <Styled.Title>{ data.titulo }</Styled.Title> */}
            <FormAppointment />
          </Styled.RegisterArea>
        </>
      )
  }
  
  // return isLogged ? render() : <Navigate to='/login' />

  return render();
}