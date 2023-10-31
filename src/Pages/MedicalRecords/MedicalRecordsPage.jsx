import * as Styled from './MedicalRecordsPage.style'
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';

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
                    </Styled.Title>
                </Styled.ContainerArea>
            </>
        )
    }

    return render();
}