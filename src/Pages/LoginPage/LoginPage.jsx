import { FormLoginComponent } from "../../Components/LoginForm/LoginFormComponent";
/* import { useNavigate } from 'react-router-dom'; */


import * as Styled from './LoginPage.style';

import imagemLogin from '../../../public/LogoGenerica.jpg';



export const LoginPage = () => {


  return (
    <>

      <Styled.ContainerLogin>
          <Styled.ImageLogin src={imagemLogin} />
          <Styled.BarraCentral/>

          <Styled.DivCriarConta>
            <Styled.LabelCriarConta>Não possui uma conta?</Styled.LabelCriarConta>
            <Styled.ButtonHeaderLogin onClick={() => alert('Entre em contato com o Administrador do Serviço e solicite o seu cadastro')}>Criar Conta</Styled.ButtonHeaderLogin>
          </Styled.DivCriarConta>

          <Styled.Login>
            <FormLoginComponent/>
          </Styled.Login>

      </Styled.ContainerLogin>
    </>
  )
}


