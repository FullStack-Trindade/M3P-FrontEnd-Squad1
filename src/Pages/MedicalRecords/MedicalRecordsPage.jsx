import * as Styled from './MedicalRecordsPage.style'
import { useContext, useEffect } from 'react';

import { HeaderContext } from '../../Context/Header.context';
import { InputSearchMedicalRecord } from '../../Components/InputSearchMedicalRecord/InputSearchMedicalRecord';

export const MedicalRecordsPage = () => {

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

    return render();
}