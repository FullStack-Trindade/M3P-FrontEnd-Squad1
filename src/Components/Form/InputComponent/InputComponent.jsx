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
  type
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return(
    <Styled.InputGroup $width={ $width } $height={ $height }>

      <Styled.Label $color={ error && 'danger' } htmlFor={ id }>{ label }</Styled.Label>

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

    </Styled.InputGroup>
  )
}

InputComponent.propTypes = {
  $width: PropTypes.string,
  $height: PropTypes.string,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
}