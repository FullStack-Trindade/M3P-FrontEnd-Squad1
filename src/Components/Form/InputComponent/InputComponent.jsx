import PropTypes from 'prop-types';
import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import * as Styled from './Input.style';


export const InputComponent = ({ 
  $width, 
  $height,
  error,
  id,
  label,
  type,
  minLength,
  placeholder,
  min,
  disabled,
  register,
  onChange
}) => {

export const InputComponent = ({ label, type, id, placeholder, register, error, $width, $height, minLength,value, onChange, disabled }) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return(

    <Styled.InputGroup $width={ $width } $height={ $height }>

      <Styled.Label $color={ error && 'danger' } htmlFor={ id }>{ label }</Styled.Label>

      { type !== 'textarea' && 
        <Styled.InputContainer>

          <Styled.Input 
            $height={ $height }
            $width={ $width }
            $color={ error && 'danger' } 
            type={ showPassword ? 'text' : type } 
            minLength={ minLength }
            id={ id } 
            placeholder={ placeholder } 
            min={ min }
            disabled={ disabled }
            onChange={ onChange }
            { ...register }
          />

          { type === 'password' && 
            <Styled.Icon 
              $color={ error && 'danger' } 
              type='button' 
              onClick={ handleShowPassword }
            >
              { !showPassword 
                ? <MdVisibility/>
                : <MdVisibilityOff/>
              }
            </Styled.Icon>
          }


    <Styled.InputGroup $width={$width} $height={$height} >
      <Styled.Label $color={error && 'danger'} htmlFor={ id }>{ label }</Styled.Label>

      { type !== 'textarea' && 
        <Styled.InputContainer>
          <Styled.Input 
          disabled ={disabled}
            $height={$height}
            $width={$width}
            $color={error && 'danger'} 
            type={ showPassword ? 'text' : type } 
            minLength={''}
            id={ id } 
            value={value}
            onChange={ onChange } 
            placeholder={ placeholder } 
            {...register}/>
          
          { type === 'password' && 
          
          <Styled.Icon 
            $color={error && 'danger'} 
            type='button' 
            onClick={handleShowPassword}>
                { !showPassword 
                    ? <MdVisibility/>
                    : <MdVisibilityOff/>
              }
            </Styled.Icon>
          }
        </Styled.InputContainer>
      }

      { type === 'textarea' &&

        <Styled.TextArea 
          $height={ $height }
          $color={ error && 'danger' } 
          id={ id } 
          minLength={''}
          placeholder={ placeholder } 
          disabled={ disabled }
          { ...register }
        />
      }

            <Styled.TextArea 
            disabled ={disabled}
            $height={$height}
            $color={error && 'danger'} 
            id={ id } 
            minLength={''}
            placeholder={ placeholder } 
            {...register}/>
          }

    </Styled.InputGroup>
  )
}

InputComponent.propTypes = {

  $width: PropTypes.string,
  $height: PropTypes.string,
  $color: PropTypes.string,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  minLength: PropTypes.any,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  register: PropTypes.any,
  onChange: PropTypes.func

  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.any,
  minLenght: PropTypes.any,
  error: PropTypes.any,
  $height: PropTypes.string,
  $width: PropTypes.string,
  $color: PropTypes.string,
  value:PropTypes.string,
  onChange:PropTypes.string,
  disabled:PropTypes.any,

}