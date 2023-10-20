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
  register
}) => {
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

        </Styled.InputContainer>
      }

    </Styled.InputGroup>
  )
}

InputComponent.propTypes = {
  $width: PropTypes.string,
  $height: PropTypes.string,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  minLength: PropTypes.any,
  placeholder: PropTypes.string,
  min: PropTypes.number,
  disabled: PropTypes.bool,
  register: PropTypes.any
}