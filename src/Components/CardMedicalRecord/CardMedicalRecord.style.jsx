import styled from 'styled-components';

export const CardContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 4vw 0 0 0;
    
`

export const RenderCard = styled.div`
    display: flex;
    width: 100%;
    margin: auto;
    border-radius: 5px;
    box-shadow: 3px 3px 3px gray;
    
`

export const PatientData = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`

export const Data = styled.li`
    display: flex;
    margin: 1vw;
    justify-content: center;
    font-size: 1rem;
`

export const Arrow = styled.button`
    display: flex;
    justify-content: center;
    align-self: center;
    margin: 5px 20px ;
    font-size: 2rem;
    border: none;
    background-color: transparent;
`