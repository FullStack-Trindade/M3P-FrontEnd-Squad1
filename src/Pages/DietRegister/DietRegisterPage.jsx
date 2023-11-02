import * as Styled from './DietRegisterPage.style';
import { useContext, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// import { AuthContext } from '../../Context/auth.context';
import { HeaderContext } from '../../Context/Header.context';

export const DietRegisterPage = () => {
    // const { tokenUser, setTokenUser } = useContext(AuthContext);
    // const localToken = JSON.parse(localStorage.getItem('token'));

    // useEffect(() => { 
    //     if (localToken !== null) {
    //         fetchAuth() 
    //     }
    // }, [localToken]);

    // const fetchAuth = async() => {
    //     const authToken = await AuthService.Get();
    //     const tokenExists = authToken.filter(auth => auth.token_user === localToken);

    //     if (tokenExists.length === 0) { return }
        
    //     setTokenUser(tokenExists[0]?.token_user);
    // }

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

    // return !!tokenUser && (tokenUser === localToken) ? render() : <Navigate to='/login'/>;
    return render();
}
