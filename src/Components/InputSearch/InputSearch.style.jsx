import styled from 'styled-components';

export const InputContainer = styled.div`
    display: block;
    width: 100%;
    height: 7vw;
    border-radius: 5px;
    margin: 0 auto;


    .container-faq {
    display: flex !important;
    justify-content: center !important;
    margin: 0 auto 2vw !important;
}

h2 {
    display: flex;
    color: gray;
}

.inputFaq {
    width: 100%;
    height: 3vw;
    margin: 0 0 0 auto !important;


}

.botao {
    display: flex;
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

.input2 {
    margin: 0 0 0 auto !important;

}
`

export const FormInput = styled.form`
    display: flex;
    margin-top: 1vw;

`

export const CardRender = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 16px;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
`
