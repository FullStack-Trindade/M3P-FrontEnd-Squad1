import styled from 'styled-components';

export const ContainerCardEstatisticas = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    width: 30vw;
    height: 5vw;
    box-shadow: 5px 5px 10px gray;
    border-radius: 5px;
    margin-top: 1vw;

`


export const IconCard = styled.img`
    width: 2vw;
    height: 2vw;
    box-shadow: 5px 5px 10px gray;
    border-radius: 5px;
`

export const HeaderCard = styled.h1`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10vw;
        font-size: 150%;
        color: black;

        

            span{
                display: flex;
                justify-content: center;
                align-items: center;
                color: black;
                size: 110%;
                margin-right: 1vw;


                width: 4vw;
                height: 4vw;
                border: 2px solid black;
                border-radius: 100%;
            }

            img {
                width: 3.2vw;
                border-radius: 150%;
            }
`

export const HeaderCard2 = styled.h3`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10vw;
        height: auto;
        font-size: 80%;
        color: black;

`