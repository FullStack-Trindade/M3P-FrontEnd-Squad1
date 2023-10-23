import * as Styled from './CadastroExame.style';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import { InputSearchExame } from '../../Components/InputSearchExame/InputSearchExame';



export const CadastroExamePage = () => {


  const { setData } = useContext(HeaderContext);
  useEffect(() => {
    setData({
      titulo: 'CADASTRO DE EXAME',
    });

  }, []);


  const render = () => {
    return (
      <>
        <Styled.AreaCadastro>
          <Styled.Title>
            <InputSearchExame />
          </Styled.Title>
        </Styled.AreaCadastro>
      </>
    )
  }

  return render()

}
