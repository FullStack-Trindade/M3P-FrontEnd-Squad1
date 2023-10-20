import PropTypes from 'prop-types';

import * as Styled from './Input.style';

export const InputComponent = ({ 
  $width, 
  $height,
  error,
  id,
  label
}) => {

  return(
    <Styled.InputGroup $width={ $width } $height={ $height }>

      <Styled.Label $color={ error && 'danger' } htmlFor={ id }>{ label }</Styled.Label>

    </Styled.InputGroup>
  )
}

InputComponent.propTypes = {
  $width: PropTypes.string,
  $height: PropTypes.string,
  error: PropTypes.any,
  id: PropTypes.string.isRequired,
  label: PropTypes.string
}