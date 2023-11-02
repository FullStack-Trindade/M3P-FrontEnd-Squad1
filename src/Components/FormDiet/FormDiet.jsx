import * as Styled from './FormDiet.style';

import { useForm } from 'react-hook-form';
import { Switch } from 'antd';

import { InputComponent } from '../Form/InputComponent/InputComponent';
// import { Select } from '../Form/InputComponent/Input.style';

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
                        {/* {
                            patientName
                            ? `Dieta de ${ patientName }`
                            : 'Formulário de Dieta' 
                        } */}
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
                    </Styled.InputGroup>

                    <Styled.InputGroup>
                        <Styled.SelectGroup>
                            <Styled.SelectLabel>Tipo de Dieta *</Styled.SelectLabel>
                            <Styled.Select
                                id='dietType'
                                name='dietType'
                                placeholder='Selecione o tipo de dieta'
                                register={{
                                    ...register('dietType', {
                                        required: true
                                    })
                                }}
                                error={ errors.dietType }
                            >
                                <option value={ 'CETOGÊNICA' }>CETOGÊNICA</option>
                                <option value={ 'DASH' }>DASH</option>
                                <option value={ 'DUKAN' }>DUKAN</option>
                                <option value={ 'LOW CARB' }>LOW CARB</option>
                                <option value={ 'MEDITERRÂNEA' }>MEDITERRÂNEA</option>
                                <option value={ 'PALEOLÍTICA' }>PALEOLÍTICA</option>
                                <option value={ 'OUTRA' }>OUTRA</option>
                            </Styled.Select>
                        </Styled.SelectGroup>

                        <InputComponent $width={'100%'}
                            id='dietDate'
                            type='date'
                            placeholder='Digite a data da dieta'
                            label='Data da Dieta *'
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
                            label='Hora da Dieta *'
                            name='dietHour'
                            register={{
                                ...register('dietHour', {
                                    required: true,
                                })
                            }}
                            error={ errors.dietHour }
                        />
                    </Styled.InputGroup>

                    <Styled.InputGroup>
                        <InputComponent $height={'70px'}
                            id='dietDescription'
                            type='textarea'
                            placeholder='Descreva a dieta'
                            name='dietDescription'
                            label='Descrição da Dieta'
                            register={{
                                ...register('dietDescription', {
                                    required: true,
                                    minLength: 10 ,
                                    maxLength: 1000 ,
                                })
                            }}
                            error={ errors.dietDescription }
                        />
                    </Styled.InputGroup>

                    <Styled.InputGroup>
                        <Styled.SelectGroup>
                            <Styled.SelectLabel>Status do Sistema *</Styled.SelectLabel>
                            <Styled.Select
                                id='status'
                                name='status'
                                placeholder='Selecione o status do sistema'
                                register={{
                                    ...register('status', {
                                        required: true
                                    })
                                }}
                                error={ errors.status }
                            >
                                <option value={ true }>ATIVO</option>
                                <option value={ false }>INATIVO</option>
                            </Styled.Select>
                        </Styled.SelectGroup>
                    </Styled.InputGroup>
                </Styled.MainForm>
            </Styled.Form>

        </>
    )
}