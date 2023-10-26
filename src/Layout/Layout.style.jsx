import styled from 'styled-components'

export const App = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: white;
`;


export const Sidebar = styled.div`
    height: 90%;
`;

export const Main = styled.div`
    display: flex;
    flex: 1 0 0;
    flex-direction: column;
    width: 90%;
    height: 100%;
`;


export const Header = styled.header`
    display: flex;
    justify-content: center;

    div{
        box-shadow: none;
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin: 0;
`;