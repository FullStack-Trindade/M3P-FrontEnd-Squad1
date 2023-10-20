import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Login = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

`

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: space-around;
    align-items: center;
    margin: 0 auto !important;
  width: 100%;
  height: auto;
  font-size: 0.9em;
`
export const ImageLogin = styled.img`
  display: flex;
  justify-content: center;
  width: 30vw;
  height: auto;
  margin: 0 10vw;
`

/* export const FormLoginStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto !important;
  color: "black";
  width: 30vw;
  height: 90vh;
  font-size: 0.9em;
  margin: 0em;
  padding: 0.4em 1em;
  position: relative;

  legend {
    font-size: 3rem;
    font-weight: bold;
    color: #424949 ;
    width: 20vw;

    margin-bottom: 4vh;
  }

  .criarConta {
    font-size: .7rem;
    margin-bottom: .5rem;
    text-align: start;

  }
` */

export const LabelCriarConta = styled.div`
  display: flex;
  justify-content: right;
  width: 20vw;
  margin-bottom: 0;
  align-items: center;
  
`

export const DivCriarConta = styled.div`
  display: flex;
  justify-content: right;

  width: 95vw;
  margin: 2vw 0 50vw;
  align-items: center;
  position: absolute;

  
`

export const BarraCentral = styled.div`
    display: flex;
    justify-content: center !important;
    width: .75vw;
    height: 100vh;
    background: #4682B4;
    margin-left: 10vw;
`

export const ButtonHeaderLogin = styled.button`
  background: ${({ $outlined }) => { return $outlined ? 'transparent' : '#fff'}};
  width: 7vw;
  font-size: .9em;
  margin-left: 1rem;
  padding: 0.20em 0.4em 0.20em;
  border: 1.5px solid #4682B4;
  border-radius: 7px;
  color: #4682B4;
  font-weight: bold;

  &:disabled {
    cursor: not-allowed;
  }
`

ButtonHeaderLogin.propTypes = {
  $outlined: PropTypes.bool
}

