import { useContext} from 'react';
import { useForm } from "react-hook-form";
import { ThemeContext } from '../../Context/Theme.context.jsx';

export const  ConfigPage = () => {
    const { setTheme, theme } = useContext(ThemeContext);
    const { handleSubmit, register } = useForm();

    const onSubmit = (data) => {
        const body = {
            cores: {
                primary: data.primaryColor,
                second: data.secondColor,
            }
        };

        setTheme({...theme, ...body});
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="primaryColor">Cor Primária</label>
                <input type="color" id="primaryColor" {...register('primaryColor')}></input>
            </div>

            <div>
                <label htmlFor="secondColor">Cor Secundária</label>
                <input type="color" id="secondColor" {...register('secondColor')}></input>
            </div>

            <div>
                <button type="submit">Enviar</button>
            </div>
        </form>
    )
}