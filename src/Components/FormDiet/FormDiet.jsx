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
        watch,
        formState: { errors },
    } = useForm()

    let params = new URL(document.location).searchParams;
    const dietId = params.get('id');
    
    useEffect(() => { 
        reset();
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

    useEffect(() => {
        if (dietId !== null) { filterDiet() }
    }, [dietsList]);

    const [diet, setDiet] = useState([]);
    const filterDiet = () => {
        const filteredDiet = dietsList.filter(diet => String(diet.id).includes(dietId));
        setDiet(filteredDiet);
    }

    useEffect(() => {
        if(diet.length > 0) {
            setValue('idPatient', diet[0].id_patient);
            setValue('idDoctor', diet[0].id_doctor);
            setValue('dietName', diet[0].diet_name);
            setValue('dietType', diet[0].diet_type);
            setValue('dietDate', diet[0].diet_date);
            setValue('dietHour', diet[0].diet_hour);
            setValue('dietDescription', diet[0].diet_description);
            setValue('status', diet[0].status);
        }
    }, [diet])

    const inputPatientId = watch('idPatient');
    const patientName = watch('patientName');
    useEffect(() => { onChangePatient(inputPatientId) }, [inputPatientId]);

    const onChangePatient = (value) => {
        const idPatient = value;

        if (idPatient > 0) {
        const dataPatient = patientsList.filter(patient => String(patient.id).includes(idPatient));
        const dataUser = usersList.filter(user => String(user.id).includes(String(dataPatient[0]?.idUser)));
        setValue('patientName', dataUser[0]?.name);
        }
    }

    const inputDoctorId = watch('idDoctor');
    useEffect(() => { onChangeDoctor(inputDoctorId) }, [inputDoctorId]);
    
    const onChangeDoctor = (value) => {
        const idDoctor = value;

        if (idDoctor > 0) {
        const dataDoctor = usersList.filter(user => String(user.id).includes(idDoctor));
        setValue('doctorName', dataDoctor[0]?.name);
        }
    }

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
                    case 201:
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
        const response = await DietService.Delete(dietId);
    
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

    const [isEditActive, setIsEditActive] = useState(false);

    return (
        <>
            
            <Styled.Form onSubmit={ handleSubmit(onSubmitForm) }>

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
                        <Switch 
                            defaultChecked={ isEditActive }
                            disabled={ !dietId }
                            onClick={ () => setIsEditActive(!isEditActive) } 
                            onChange={ () => setIsEditActive(!isEditActive) }
                        />
                    </Styled.SwitchBtn>

                    <Styled.ButtonDel 
                        $width={'10%'} 
                        $active={ dietId } 
                        type='button'
                        disabled={ !dietId }
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
                            disabled={ dietId && isEditActive === false }
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
                            disabled={ dietId && isEditActive === false }
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
                                disabled={ dietId && isEditActive === false }
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
                            disabled={ dietId && isEditActive === false }
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
                            disabled={ dietId && isEditActive === false }
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
                            disabled={ dietId && isEditActive === false }
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
                                defaultValue={ '' }
                                disabled={ dietId && isEditActive === false }
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