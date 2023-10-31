import * as Styled from './MedicalRecordsPage.style'
import { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

import { HeaderContext } from '../../Context/Header.context';
import { InputSearchMedicalRecord } from '../../Components/InputSearchMedicalRecord/InputSearchMedicalRecord';

export const MedicalRecordsPage = () => {
    // const isLogged = JSON.parse(localStorage.getItem('isLogged'));

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

    // return isLogged ? render() : <Navigate to='/login' />

    return render();
}