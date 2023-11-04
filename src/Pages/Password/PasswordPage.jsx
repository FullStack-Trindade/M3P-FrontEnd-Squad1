import * as Styled from './PasswordPage.style';

import imagemLogin from '../../../public/images/LogoGenerica.png';

export const PasswordPage = () => {
    const render = () => {
        return (
            <>
                <Styled.ContainerPassword>
        
                    <Styled.ImagePassword src={ imagemLogin } />
        
                    <Styled.CentralDivider/>
        
                    <Styled.Form>

                    </Styled.Form>
        
                </Styled.ContainerPassword>
            </>
        )
    }

    return render();
}