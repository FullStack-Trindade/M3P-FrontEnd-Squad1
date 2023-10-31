import { Outlet } from "react-router-dom"

import * as Styled from './Layout.style'
import { MenuComponent}  from '../Components/Menu/MenuComponent/MenuComponent';
import HeaderComponent from '../Components/ToolBar/ToolBarComponent';

export const Layout = () => {

    const render = () => {

        return (
            <Styled.App>
            
            <Styled.Sidebar>
                <MenuComponent/>
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