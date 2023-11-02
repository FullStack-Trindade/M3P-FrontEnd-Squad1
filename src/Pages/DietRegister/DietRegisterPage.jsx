import * as Styled from './DietRegisterPage.style';
import { useContext, useEffect } from 'react';

import { HeaderContext } from '../../Context/Header.context';

export const DietRegisterPage = () => {

    const { setData } = useContext(HeaderContext)

    useEffect(() => {
        setData({ titulo: 'CADASTRO DE DIETA' })
    }, []);
    
    const render = () => {
        return (
            <>
                <Styled.RegisterArea>
                    <Styled.Title>

                    </Styled.Title>
                </Styled.RegisterArea>
            </>
        )
    }

    return render();
}
