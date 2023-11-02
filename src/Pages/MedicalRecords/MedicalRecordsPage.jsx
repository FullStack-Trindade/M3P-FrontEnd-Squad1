import * as Styled from './MedicalRecordsPage.style'
import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';
import { AuthService } from '../../Service/Auth.service';
import { InputSearchMedicalRecord } from '../../Components/InputSearchMedicalRecord/InputSearchMedicalRecord';

export const MedicalRecordsPage = () => {
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

        const { setData } = useContext(HeaderContext);

        useEffect(() => { 
            setData({ titulo: 'LISTAGEM DE PRONTUÁRIOS' })
        }, []);

        return (
            <>
                <Styled.ContainerArea>
                    <Styled.Title>
                        <InputSearchMedicalRecord/>
                    </Styled.Title>
                </Styled.ContainerArea>
            </>
        )
    }

    return !!tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
}