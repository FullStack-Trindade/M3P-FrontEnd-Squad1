import styled from 'styled-components';

export const ContainerEstatisticasADM = styled.div`
    width: 100%;
    height: auto;
    box-shadow: none;
    justify-content: center;
    margin: 1vw 0;
    color: gray;


    h2{
        margin-left: 6%
    }

`

export const ContainerEstatisticas = styled.div`
    width: 100%;
    height: 30vh;
    box-shadow: none;
    justify-content: center;
    margin: 1vw 0;
    color: gray;


    h2{
        margin-left: 6%
    }

`

export const ContainerCardEstatisticas = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    
    width: 80%;
    border-radius: 5px;
    margin-top: 2vh;
`
export const InputContainer = styled.div`
    display: block;
    width: 100%;
    height: 7vw;
    border-radius: 5px;
    margin: 2vw 0 0 0;

    h4 {
        display: flex;
        color: gray;
    }

    .input2 {
        margin: 0 0 0 auto !important;
    }

    .inputFaq {
        width: 100%;
        height: 3vw;
        margin: 0 0 0 auto !important;
    }

    .button {
        display: table-cell;
        margin: 0 auto 0 2vw !important;  
        padding: 12px 32px;  
        background: transparent ;
        border-radius: 4px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        text-transform: uppercase;
        color: black;
        border: 1px solid gray;
        cursor: pointer;
    }
`;

export const SearchInput = styled.div`
    display: flex;
    margin-top: 1vw;
   border: 1px solid red;
`;

export const PatientArea = styled.div`
    display: flex;
    margin: 0;
`;




