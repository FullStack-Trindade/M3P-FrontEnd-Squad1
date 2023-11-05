import styled from 'styled-components';
import PropTypes from 'prop-types';

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

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 25px;
`;

export const ModalBodyP = styled.p`
    text-align: center;
    width: 90%;
`;

export const ModalForm = styled.form`
    display: inline-flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    border-radius: 0.625rem;
    background: #FFF;
    width: 100%;
`;

export const ModalButton = styled.button`
    display: flex;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 100%;
    border-radius: 0.3125rem;
    background: ${({ $outlined }) => { return $outlined ? 'transparent' : 'rgba(82, 129, 220, 1)'}};
    border:  ${({ $outlined }) => { return !$outlined ? 0 : '1px solid rgba(82, 129, 220, 1)'}};
    color: ${({ $outlined }) => { return !$outlined ? '#EFEFEF' : 'rgba(82, 129, 220, 1)'}};
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    opacity: ${({$active}) => { return $active ? 1 : .5 }};
    cursor: pointer;

    &:disabled {
        cursor: not-allowed;
    }
`;

ModalButton.propTypes = {
    $outlined: PropTypes.bool
}