import PropTypes from 'prop-types';
import * as Styled from './Select.style';

export const SelectComponent = ({ label, error, name, info, options = [], $width, register }) => {
    
  return (
<Styled.SelectContainer $width={$width}>
    <Styled.Label htmlFor={name}>{label}</Styled.Label>

    <Styled.Select $width={$width} id={name} {...register}>

    <option value={null}>Selecione</option>
    { options.map( option => 
      <option key={option.id} value={option.value}>
        {option.label}
      </option>
      )}
    </Styled.Select>
   

    { error && <p>*{ error.message }</p>}
    { info && <p>{ info }</p>}

</Styled.SelectContainer>
  )
}

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })),
  error: PropTypes.any,
  info: PropTypes.string,

}