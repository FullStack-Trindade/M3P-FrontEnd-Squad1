import React from 'react'
import { Container } from './MenuItemFechado.style'

const MenuItemFechado = ({ Icon, Text, To }) => {
  return (
    <Container to={To}>
      <Icon />
      {Text}
    </Container>
  )
}

export default MenuItemFechado