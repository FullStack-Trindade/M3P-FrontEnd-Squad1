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