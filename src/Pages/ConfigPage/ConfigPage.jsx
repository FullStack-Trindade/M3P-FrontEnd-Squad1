import * as Styled from './ConfigPage.style';

import { useContext, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { ThemeContext } from '../../Context/Theme.context.jsx';
import { HeaderContext } from '../../Context/Header.context';

export const  ConfigPage = () => {

    const { setData } = useContext(HeaderContext)
    useEffect(() => {
      setData({       
        titulo: 'Configurações do Sistema',}) 
        
      }, []);


    const { setTheme, theme } = useContext(ThemeContext);
    const { handleSubmit, register } = useForm();

    const onSubmit = (data) => {
        const body = {
            cores: {
                primary: data.primaryColor,
                second: data.secondColor,
            },
   
        };

        setTheme({...theme, ...body});
    }

    return(
        <Styled.AreaConfig>

        <Styled.ConfigPageTitulo>Configurações de Estilo   </Styled.ConfigPageTitulo>
        <Styled.ConfigForm onSubmit={handleSubmit(onSubmit)}>
            <Styled.divConfig>
                <label htmlFor="primaryColor">Cor Primária</label>
                <input type="color" id="primaryColor" {...register('primaryColor')}></input>
            </Styled.divConfig>

            <Styled.divConfig>
                <label htmlFor="secondColor">Cor Secundária</label>
                <input type="color" id="secondColor" {...register('secondColor')}></input>
            </Styled.divConfig>


            <Styled.divConfig>
                <button type="submit">Enviar</button>
            </Styled.divConfig>
        </Styled.ConfigForm>
        </Styled.AreaConfig>
    )
}