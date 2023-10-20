import * as Styled from './FormAppointmet.style';

import { Switch } from "antd";

import { InputComponent } from '../Form/InputComponent/InputComponent';

export const FormAppointment = () => {
  return (
    <>
      <Styled.Form>

        <Styled.Header>

          <Styled.LabelSwitch>Editar</Styled.LabelSwitch>

          <Styled.SwitchBtn>
            <Switch 
              // defaultChecked={  }
              // disabled={  }
              // onClick={  } 
              // onChange={  }
            />
          </Styled.SwitchBtn>

          <Styled.ButtonDel 
            $width={'10%'} 
            // $active={  } 
            type='button' 
            // disabled={  } 
            // onClick={  }
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
              label='Código do Paciente*'
              name='idPatient'
              min={ 1 }
              // disabled={  }
              // register={}
              // error={  }
            />

            <InputComponent $width={'350%'}
              id='patientName'
              type='string'
              placeholder='Nome do paciente'
              label='Nome do Paciente'
              name='patientName'
              disabled={ true }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>
          
          <Styled.InputGroup>
            <InputComponent $width={'100%'}
              id='idDoctor'
              type='number'
              placeholder='Digite o código'
              label='Código do Médico(a)*'
              name='idDoctor'
              min={ 1 }
              // disabled={  }
              // register={}
              // error={  }
            />
            
            <InputComponent $width={'350%'}
              id='doctorName'
              type='string'
              placeholder='Nome do médico(a)'
              label='Nome do médico(a)'
              name='doctorName'
              disabled={ true }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $width={'350%'}
              id='appointmentReason'
              type='string'
              placeholder='Digite o motivo da consulta'
              label='Motivo da Consulta*'
              name='appointmentReason'
              // disabled={  }
              // register={}
              // error={  }
            />

            <InputComponent $width={'100%'}
              id='appointmentDate'
              type='date'
              placeholder='Digite a data da consulta'
              label='Data da Consulta*'
              name='appointmentDate'
              // disabled={  }
              // register={}
              // error={  }
            />

            <InputComponent $width={'100%'}
              id='appointmentHour'
              type='time'
              placeholder='Digite o hora da consulta'
              label='Hora da Consulta*'
              name='appointmentHour'
              // disabled={  }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'100px'}
              id='problemDescription'
              type='textarea'
              placeholder='Descreva o problema'
              name='problemDescription'
              label='Descrição do Problema*'
              // disabled={  }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'70px'}
              id='medicationPrescribed'
              type='textarea'
              placeholder='Medicação Receitada'
              name='medicationPrescribed'
              label='Medicação Receitada'
              // disabled={  }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>

          <Styled.InputGroup>
            <InputComponent $height={'70px'}
              id='dosagePrecautions'
              type='textarea'
              placeholder='Dosagem e Precauções'
              name='dosagePrecautions'
              label='Dosagem e Precauções*'
              // disabled={  }
              // register={}
              // error={  }
            />
          </Styled.InputGroup>
        </Styled.MainForm>
      </Styled.Form>
    </>
  )
}