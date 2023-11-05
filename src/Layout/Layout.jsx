import { Outlet } from "react-router-dom"

import * as Styled from './Layout.style'
import { MenuComponent}  from '../Components/Menu/MenuComponent/MenuComponent';
import HeaderComponent from '../Components/ToolBar/ToolBarComponent';


import { ThemeContext } from './../Context/Theme.context.jsx'
import { useContext} from 'react';

export const Layout = () => {
    
    const { theme } = useContext(ThemeContext);

    const render = () => {

        return (
            <Styled.App>
            
            <Styled.Sidebar >
                <MenuComponent colors={theme.colors}/>
            </Styled.Sidebar>
            
            <Styled.Main>
                <Styled.Header>
                    <HeaderComponent></HeaderComponent>
                </Styled.Header>
            
                <Styled.Content>
                    <Outlet />
                </Styled.Content>
            </Styled.Main>

            </Styled.App>
        );
    }

    return render()
}