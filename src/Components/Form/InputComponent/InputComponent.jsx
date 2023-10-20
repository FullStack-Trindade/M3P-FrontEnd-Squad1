import PropTypes from 'prop-types';

import * as Styled from './Input.style';

export const InputComponent = ({ 
  $width, 
  $height
}) => {

  return(
    <Styled.InputGroup $width={ $width } $height={ $height }>

    </Styled.InputGroup>
  )
}

InputComponent.propTypes = {
  $width: PropTypes.string,
  $height: PropTypes.string
}