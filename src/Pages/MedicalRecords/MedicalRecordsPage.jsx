import * as Styled from './MedicalRecordsPage.style'
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';
import { AuthService } from '../../Service/Auth.service';
import { InputSearchMedicalRecord } from '../../Components/InputSearchMedicalRecord/InputSearchMedicalRecord';

export const MedicalRecordsPage = () => {
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
        setData({ titulo: 'LISTAGEM DE PRONTUÁRIOS' })
    }, []);

    const render = () => {
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

    
    if (loading === true) {
        return <div>Loading...</div>;
    }

    return tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
}