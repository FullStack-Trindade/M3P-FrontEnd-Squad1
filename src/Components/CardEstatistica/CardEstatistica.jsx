import * as Styled from './CardEstatistica.style';

import  LogoTeste  from '../../../public/images/LogoGenerica.jpg'

function CardEstatistica ({dataCard})  {



  return (

    <>
    <Styled.ContainerCardEstatisticas>  

            <Styled.HeaderCard id='resultado'>
              <Styled.IconCardSpan id='icone'>
                {dataCard.icone || <img src={LogoTeste}/>}
              </Styled.IconCardSpan>
              <Styled.DataCardSpan>
                {dataCard.resultado || 0}
                </Styled.DataCardSpan>
            </Styled.HeaderCard>

            <Styled.HeaderCard2 id='legenda'>{dataCard.legenda || 'Erro aqui'}</Styled.HeaderCard2>

    
    </Styled.ContainerCardEstatisticas>

    </>
  );
}

export default CardEstatistica;