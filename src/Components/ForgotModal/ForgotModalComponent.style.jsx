import styled from 'styled-components';

export const Modal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContainer = styled.div`
    width: 550px;
    border-radius: 10px;
    background-color: #fff;
    color: var(--color-porcelain);
`;

export const ModalTitle = styled.span`
    display: inline-block;
    width: 100%;
    color:  #5281DC;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    border-bottom: 1px solid var(--color-porcelain);
    padding: 10px 0;
    margin: 20px 0;
`;