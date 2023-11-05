import styled from 'styled-components';

export const MenuContainer = styled.div`
  display: flex;
  height: 140%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: ${({colors}) => colors.primary};
  

  span.ant.switch-inner {

    margin-top: 20vw;
  }

`;

export const MenuArea = styled.div`
  display: flex;
  width: 20rem;
  height: auto;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  background-color: ${({colors}) => colors.primary}; 
  margin-top: -2vw;
`;

export const MenuLogo = styled.img`
  width: 20vw;
  margin: 0 auto 0 auto;
`


export const MenuFooter = styled.legend`
  display: flex;
  justify-content: space-around;
  color: white;
  margin: 0vh auto;
  width: 13vw;
  
`

export const MenuFechado = styled.div`
  display: flex;
  width: 7rem;
  height: 115%;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${({colors}) => colors.primary};
`;

export const MenuLogoFechado = styled.img`
  width: 8vw;
  margin: 2rem auto 1rem;
`

export const MenuFooterFechado = styled.legend`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: column;
  color: white;
  margin: 3vh auto;
  width: 5vw;
  font-size: .8vw;
  height: 10vh;
`

export const LabelSwitchFechado = styled.label`
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  margin-bottom: 0.5vh;
  width: 100%;

`



export const LabelSwitch = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${({colors}) => colors.primary};
  font-size: 0.8rem;
  color: white;
  padding-bottom: 1vh;
  margin-top: -35vh;
`

export const SwitchBtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: ${({colors}) => colors.primary};
  padding-bottom: 4vh;
`

export const MenuSetor = styled.p`
    margin-left: 12%;
    color: #fff; 
    margin-top: -1vh;

`
