import * as Styled from './CadastroUsuario.style'

import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';


import { FormUsuario } from '../../Components/FormUsuario/FormUsuario'

export const CadastroUsuarioPage = () => {
  
  
  const { setData } = useContext(HeaderContext)
  useEffect(() => {
    setData({       
      titulo: 'CADASTRO DE USUÁRIO',}) 
      
    }, []);
    
  
    const render = () => {
        return (
          <Styled.AreaCadastro>
            <Styled.Title>
              Preencha os campos para cadastrar
            </Styled.Title>
              <Styled.AreaPaciente>

                <FormUsuario/>
            
              </Styled.AreaPaciente> 

          </Styled.AreaCadastro>
      )
    }
    return render()    
  }
  


  

