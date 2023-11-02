import * as Styled from './CardEstatistica.style';

import  LogoTeste  from '../../../public/images/LogoGenerica.jpg'

function CardEstatistica ({dataCard})  {



  return (

    <>
    <Styled.ContainerCardEstatisticas>  

            <Styled.HeaderCard id='resultado'>
              <span id='icone'>
                {dataCard.icone || <img src={LogoTeste}/>}
              </span>
                {dataCard.resultado || 0}
            </Styled.HeaderCard>

            <Styled.HeaderCard2 id='legenda'>{dataCard.legenda || 'Erro aqui'}</Styled.HeaderCard2>

    
    </Styled.ContainerCardEstatisticas>

    </>
  );
}

export default CardEstatistica;