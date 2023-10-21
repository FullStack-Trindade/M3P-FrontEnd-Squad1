import * as Styled from './CardEstatisticaADM.style';

import  LogoTeste  from '../../../public/images/LogoGenerica.jpg'

function CardEstatisticaADM ({dataCardADM})  {



  return (

    <>
    <Styled.ContainerCardEstatisticas>  

            <Styled.HeaderCard id='resultado'>
              <span id='icone'>
                {dataCardADM.icone || <img src={LogoTeste}/>}
              </span>
                {dataCardADM.resultado || 'Erro'}
            </Styled.HeaderCard>

            <Styled.HeaderCard2 id='legenda'>{dataCardADM.legenda || 'Erro aqui'}</Styled.HeaderCard2>

    
    </Styled.ContainerCardEstatisticas>

    </>
  );
}

export default CardEstatisticaADM;