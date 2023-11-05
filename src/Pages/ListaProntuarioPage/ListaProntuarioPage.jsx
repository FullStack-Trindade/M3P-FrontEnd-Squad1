import * as Styled from './ListaProntuarioPage.style'

import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';



import { InputSearchProntuario } from '../../Components/InputSearchProntuario/InputSearchProntuario';


export const ListaProntuarioPage = () => {
  
  
  const { setData } = useContext(HeaderContext)
  useEffect(() => {
    setData({       
      titulo: 'LISTAGEM DE PRONTUÁRIOS',}) 
      
    }, []);
    
  
    const render = () => {
        return (
          <>
        <Styled.AreaCadastro>
            <Styled.Title>
                <InputSearchProntuario/>
            </Styled.Title>
        </Styled.AreaCadastro>
          </>
      )
    }

    return render()
    
  }
  


  

