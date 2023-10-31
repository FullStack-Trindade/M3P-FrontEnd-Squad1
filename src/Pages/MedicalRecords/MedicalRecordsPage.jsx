import { HeaderContext } from '../../Context/Header.context';

export const MedicalRecordsPage = () => {

    const render = () => {

        const { setData } = useContext(HeaderContext);

        useEffect(() => { 
            setData({ titulo: 'LISTAGEM DE PRONTUÁRIOS' })
        }, []);

        return (
            <>
                
            </>
        )
    }

    return render();
}