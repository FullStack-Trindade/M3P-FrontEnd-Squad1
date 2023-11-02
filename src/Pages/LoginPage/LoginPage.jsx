import * as Styled from './LoginPage.style';
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Context/auth.context';
import { FormLoginComponent } from "../../Components/LoginForm/LoginFormComponent";
import { AuthService } from '../../Service/Auth.service';
import imagemLogin from '../../../public/images/LogoGenerica.png';

export const LoginPage = () => {
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


