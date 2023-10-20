import * as Styled from './AppointmentRegisterPage.style';
// import { useContext, useEffect } from 'react';

// import { HeaderContext } from '../../Context/Header.context';
import { FormAppointment } from '../../Components/FormAppointment/FormAppointment';

export const AppointmentRegisterPage = () => {

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

  return render();
}