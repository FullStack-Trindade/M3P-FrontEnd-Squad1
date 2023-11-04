//incluir na linha 22 (gambi para validação---> <option value={null}>Selecione</option>)

import PropTypes from "prop-types";
import * as Styled from "./Select.style";

export const SelectComponent = ({
  label,
  error,
  name,
  info,
  options = [],
  $width,
  register,
  disabled,
  onClick,
  onChange
}) => {
  return (
    <Styled.SelectContainer $width={$width}>
      <Styled.Label $color={error && "danger"} htmlFor={name}>
        {label}
      </Styled.Label>

      <Styled.Select $width={$width} id={name} {...register} disabled = {disabled} onClick = {onClick} onChange = {onChange}>
        
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </Styled.Select>

      {error && <p>*{error.message}</p>}
      {info && <p>{info}</p>}
    </Styled.SelectContainer>
  );
};

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  register: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.any,
  info: PropTypes.string,
  disabled: PropTypes.any,
  onClick: PropTypes.any,
  onChange: PropTypes.any,
};
