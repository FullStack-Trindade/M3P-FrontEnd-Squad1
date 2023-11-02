import { useForm } from 'react-hook-form';
import { Switch } from 'antd';

import { InputComponent } from '../Form/InputComponent/InputComponent';

export const FormDiet = ({ patientId }) => {
    const {
        register,
        formState: { errors },
    } = useForm()
    
    return (
        <>
            
            <Styled.Form>

                <Styled.Header>

                    <Styled.Title>
                        {
                            patientName
                            ? `Dieta de ${ patientName }`
                            : 'Formulário de Dieta' 
                        }
                    </Styled.Title>

                    <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

                    <Styled.SwitchBtn>
                        <Switch />
                    </Styled.SwitchBtn>

                    <Styled.ButtonDel 
                        $width={'10%'} 
                        type='button'
                    >
                        Deletar
                    </Styled.ButtonDel>

                    <Styled.Button 
                        $width={'10%'} 
                        $active={ true }
                        type='submit' 
                    >
                        Salvar
                    </Styled.Button>
                </Styled.Header>

                <Styled.Paragraph>* Campos obrigatórios</Styled.Paragraph>

                <Styled.MainForm $width={'100%'}>

                    <Styled.InputGroup>
                        <InputComponent $width={'100%'}
                            id='idPatient'
                            type='number'
                            placeholder='Digite o código'
                            label='Código do Paciente *'
                            name='idPatient'
                            min={ 1 }
                            register={{
                                ...register('idPatient', {
                                required: true,
                                })
                            }}
                            error={ errors.idPatient }
                        />

                        <InputComponent $width={'350%'}
                            id='patientName'
                            type='string'
                            placeholder='Nome do paciente'
                            label='Nome do Paciente'
                            name='patientName'
                            disabled={ true }
                            register={{
                                ...register('patientName', {
                                required: false
                                })
                            }}
                            error={ errors.patientName }
                        />
                    </Styled.InputGroup>

                    <Styled.InputGroup>
                        <InputComponent $width={'100%'}
                        id='idDoctor'
                        type='number'
                        placeholder='Digite o código'
                        label='Código do Médico(a) *'
                        name='idDoctor'
                        min={ 1 }
                        register={{
                            ...register('idDoctor', {
                            required: true,
                            })
                        }}
                        error={ errors.idDoctor }
                        />
                        
                        <InputComponent $width={'350%'}
                        id='doctorName'
                        type='string'
                        placeholder='Nome do médico(a)'
                        label='Nome do médico(a)'
                        name='doctorName'
                        disabled={ true }
                        register={{
                            ...register('doctorName', {
                            required: false
                            })
                        }}
                        error={ errors.doctorName }
                        />
                    </Styled.InputGroup>

                    <Styled.InputGroup>
                        <InputComponent $width={'350%'}
                            id='dietName'
                            type='string'
                            placeholder='Digite o nome da dieta'
                            label='Nome da Dieta *'
                            name='dietName'
                            register={{
                                ...register('dietName', {
                                required: true,
                                minLength: 5 ,
                                maxLength: 100 ,
                                })
                            }}
                            error={ errors.dietName }
                        />

                        <InputComponent $width={'100%'}
                            id='dietDate'
                            type='date'
                            placeholder='Digite a data da dieta'
                            label='Data da Consulta *'
                            name='dietDate'
                            register={{
                                ...register('dietDate', {
                                required: true,
                                })
                            }}
                            error={ errors.dietDate }
                        />

                        <InputComponent $width={'100%'}
                            id='dietHour'
                            type='time'
                            placeholder='Digite o hora da dieta'
                            label='Hora da Consulta *'
                            name='dietHour'
                            register={{
                                ...register('dietHour', {
                                required: true,
                                })
                            }}
                            error={ errors.dietHour }
                        />
                    </Styled.InputGroup>
                </Styled.MainForm>

            </Styled.Form>

        </>
    )
}