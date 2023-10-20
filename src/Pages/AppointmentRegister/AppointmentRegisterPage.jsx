import * as Styled from './AppointmentRegisterPage.style';

import { FormAppointment } from '../../Components/FormAppointment/FormAppointment';

export const AppointmentRegisterPage = () => {

  const render = () => {
      return (
        <>
          <Styled.RegisterArea>
              <Styled.Title>
                <FormAppointment />
              </Styled.Title>
          </Styled.RegisterArea>
        </>
      )
  }

  return render();
}