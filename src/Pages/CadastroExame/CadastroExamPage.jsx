import * as Styled from './CadastroExam.style';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import { InputSearchExam } from '../../Components/InputSearchExame/InputSearchExam';



export const CadastroExamPage = () => {


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
            <InputSearchExam />
          </Styled.Title>
        </Styled.AreaCadastro>
      </>
    )
  }

  return render()

}
