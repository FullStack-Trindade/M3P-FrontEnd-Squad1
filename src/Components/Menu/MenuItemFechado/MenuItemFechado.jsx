import React from 'react'
import { Container } from './MenuItemFechado.style'

const MenuItemFechado = ({ Icon, Text, To, onClick }) => {
  return (
    <Container to={To} onClick={onClick}>
      <Icon />
      {Text}
    </Container>
  )
}

export default MenuItemFechado