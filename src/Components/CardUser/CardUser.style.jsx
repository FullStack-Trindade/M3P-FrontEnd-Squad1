import styled from 'styled-components';


export const CardUserContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: auto;
    height: auto;
    margin: 1vw 0;

`

export const RenderCardUser = styled.div`
    width: 12vw;
    height: 12vw;
    background-image: linear-gradient(to top, #fff 37%, #fff 37%, #fff 82.5%, #92a8d1 70%, #92a8d1 20%, #92a8d1 20%, #92a8d1 );
    border-radius: 5px;
    box-shadow: 3px 3px 3px gray;
    justify-content: space-around;

`

export const IconCardUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #fff;
    width: 2.5rem;
    height: 2.5rem;
    box-shadow: 5px 5px 10px gray;
    border-radius: 100%;
    margin: 1vw auto;
    border: 2px solid #fff;
    background: #483D8B;
  
`

export const DadosUsuario= styled.div`

`


export const Dados = styled.p`
    display: flex;
    margin: .5vw;
    justify-content: center;
    font-size: 80%;
`


export const DadosNome = styled.p`
    display: flex;
    justify-content: center;
    font-size: 1.0rem;
    font-weight: bold;
    color:  #483D8B;
`