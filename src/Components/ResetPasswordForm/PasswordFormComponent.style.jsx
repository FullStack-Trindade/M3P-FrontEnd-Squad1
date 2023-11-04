import styled from 'styled-components';

export const Form = styled.form`
    display: inline-flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    border-radius: 0.625rem;
    background: #FFF;
    min-width: 320px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    align-self: stretch;
`;

export const Title = styled.legend`
    color: #5281DC;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

export const InputGroup = styled.div`
    display: flex;
    padding: 0.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    width: 100%;
`;