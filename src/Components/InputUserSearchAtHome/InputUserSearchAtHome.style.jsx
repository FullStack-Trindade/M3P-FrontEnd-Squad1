import styled from 'styled-components';

export const InputContainer = styled.div`
    display: block;
    width: 100%;
    height: 7vw;
    border-radius: 5px;
    margin: 2vh 0 0 0;

    h4 {
        display: flex;
        color: black;
        margin-left: none;
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
        margin: 0 2vw 0 2vw !important;  
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
`;

export const PatientArea = styled.div`
    display: flex;
    margin: 0;
`;