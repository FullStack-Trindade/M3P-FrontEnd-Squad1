import * as Styled from './CadastroExam.style';
import { useContext, useEffect } from 'react';
import { HeaderContext } from '../../Context/Header.context';
import { InputSearchExercise } from '../../Components/InputSearchExercise/InputSearchExercise';



export const CadastroExamPage = () => {


  const { setData } = useContext(HeaderContext);
  useEffect(() => {
    setData({
      titulo: 'CADASTRO DE EXERCICIO',
    });

  }, []);


  const render = () => {
    return (
      <>
        <Styled.AreaCadastro>
          <Styled.Title>
            <InputSearchExercise />
          </Styled.Title>
        </Styled.AreaCadastro>
      </>
    )
  }

  return render()

}
