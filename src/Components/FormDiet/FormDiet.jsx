import * as Styled from './FormDiet.style';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Switch } from 'antd';

import { DietService } from '../../Service/Diet.service';
import { PatientService } from '../../Service/Patient.service';
import { UserService } from '../../Service/User.service';

import { InputComponent } from '../Form/InputComponent/InputComponent';

export const FormDiet = ({ patientId }) => {
    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
    } = useForm()

    let params = new URL(document.location).searchParams;
    const dietId = params.get('id');
    
    useEffect(() => { 
        // reset();
        fetchDietsList();
        fetchPatientsList();
        fetchUsersList();
    }, [])

    const [dietsList, setDietsList] = useState([]);
    const fetchDietsList = async() => {
        DietService.Get().then(result => setDietsList(result));
    }

    const [patientsList, setPatientsList] = useState([]);
    const fetchPatientsList = async() => {
        PatientService.Get().then(result => setPatientsList(result));
    }

    const [usersList, setUsersList] = useState([]);
    const fetchUsersList = async() => {
        UserService.Get().then(result => setUsersList(result));
    }

    useEffect(() => { setValue('idPatient', patientId) }, [patientId])

    const isDietRegistered = (dataForm) => {
        let filteredPatientDiets = dietsList.filter(diet => String(diet.id_patient).includes(dataForm.id_patient))
        let filteredDate = filteredPatientDiets.filter(diet => diet.diet_date.includes(dataForm.diet_date))
        let filteredHour = filteredDate.filter(diet => diet.diet_hour.includes(dataForm.diet_hour))
    
        if (filteredHour.length > 0) {
            alert('Esse paciente já possui consulta cadastrada nesse dia e horário.');
            filteredPatientDiets = []
            filteredDate = []
            filteredHour = []
            return true
        }
    
        return false
    }

    const onSubmitForm = async(dataForm) => {
        const data = {
            id_patient: dataForm.idPatient,
            id_doctor: dataForm.idDoctor,
            diet_name: dataForm.dietName,
            diet_type: dataForm.dietType,
            diet_date: dataForm.dietDate,
            diet_hour: dataForm.dietHour,
            diet_description: dataForm.dietDescription,
            status: dataForm.status
        }

        dietId ? onUpdate(data) : onSave(data);
    }

    const onUpdate = async(submitData) => {
        await DietService.Update(dietId, submitData)
            .then((response) => {
                switch (response.status) {
                    case 200:
                        reset();
                        window.location.reload(true);
                        return alert('Sucesso! Dieta editada.');
                    case 400:
                        reset();
                        return alert(`Erro no cadastro! Por favor, tente novamente.`);
                    case 500:
                        reset();
                        return alert(`Erro no cadastro! Por favor, tente novamente.`);
                }
            })
            .catch((error) => {
                alert('Erro no cadastro. Por favor, tente novamente.')
                console.error('Erro ao cadastrar dieta:', error);
                reset();
            });
    };

    const onSave = async(submitData) => {
        if (isDietRegistered(submitData)) { return }

        await DietService.Create(submitData)
            .then((response) => { 
                switch (response.status) {
                    case 201:
                        reset();
                        window.location.reload(true);
                        return alert('Sucesso! Dieta cadastrada.');
                    case 400:
                        reset();
                        return alert(`Erro no cadastro! Por favor, tente novamente.`);
                    case 500:
                        reset();
                        return alert(`Erro no cadastro! Por favor, tente novamente.`);
                }
            })
            .catch((error) => {
                alert('Erro no cadastro. Por favor, tente novamente.');
                console.error('Erro ao cadastrar dieta:', error);
                reset();
            });
    };

    const onDelete = async() => {
        const response = await DietService.Delete(patientId);
    
        switch (response.status) {
            case 202:
                reset();
                window.location.reload(true);
                return alert('Sucesso! Dieta excluída.');
            case 400:
                reset();
                return alert(`Erro na exclusão! Dieta não existe.`);
            case 500:
                reset();
                return alert(`Erro na exclusão! Por favor, tente novamente.`);
        }
    };

    return (
        <>
            
            <Styled.Form onSubmit={ handleSubmit(onSubmitForm) }>

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
                        onClick={ onDelete }
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
                            <Styled.SelectLabel $color={ errors.dietType && 'danger' } htmlFor='dietType'>Tipo de Dieta *</Styled.SelectLabel>
                            <Styled.Select
                                id='dietType'
                                name='dietType'
                                defaultValue={ '' }
                                { ...register('dietType', { required: true }) }
                                $color={ errors.dietType && 'danger' }
                            >
                                <option value={ '' } disabled>Selecione o tipo de dieta</option>
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
                            <Styled.SelectLabel $color={ errors.status && 'danger' } htmlFor='status'>Status do Sistema *</Styled.SelectLabel>
                            <Styled.Select
                                id='status'
                                name='status'
                                form=''
                                defaultValue={ '' }
                                { ...register('status', { required: true }) }
                                $color={ errors.dietType && 'danger' }
                            >
                                <option value={ '' } disabled>Selecione o status do sistema</option>
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