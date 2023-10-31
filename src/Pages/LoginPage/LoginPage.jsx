import * as Styled from './LoginPage.style';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Context/auth.context';
import { FormLoginComponent } from "../../Components/LoginForm/LoginFormComponent";
import imagemLogin from '../../Assets/LogoGenerica.jpg';

export const LoginPage = () => {
    const { tokenUser } = useContext(AuthContext);
    const localToken = (JSON.parse(localStorage.getItem('token')));

    const render = () => {
        return (
            <>
                <Styled.ContainerLogin>
        
                    <Styled.ImageLogin src={ imagemLogin } />
        
                    <Styled.BarraCentral/>
        
                    <Styled.DivCriarConta>
                        <Styled.LabelCriarConta>Não possui uma conta?</Styled.LabelCriarConta>
                        <Styled.ButtonHeaderLogin 
                            onClick={ () => alert('Entre em contato com o Administrador do Serviço e solicite o seu cadastro') }
                        >
                            Criar Conta
                        </Styled.ButtonHeaderLogin>
                    </Styled.DivCriarConta>
        
                    <Styled.Login>
                        <FormLoginComponent/>
                    </Styled.Login>
        
                </Styled.ContainerLogin>
            </>
        )
    }

    return !!tokenUser && (tokenUser === localToken) ? <Navigate to='/' /> : render();

}


