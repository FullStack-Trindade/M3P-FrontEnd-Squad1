import styled from 'styled-components';

export const InputContainer = styled.div`
    display: block;
    width: 100%;
    height: 7vw;
    border-radius: 5px;
    margin: 2% 0 2% 0;

    h4 {
        display: flex;
        color: gray;
    }

    .button {
        display: flex;
        height: 2.5rem;
        margin: 0 auto 0 2vw !important;    
        background: transparent ;
        border-radius: 4px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        text-transform: uppercase;
        color: black;
        border: 1px solid gray;
        cursor: pointer;
    }
`;