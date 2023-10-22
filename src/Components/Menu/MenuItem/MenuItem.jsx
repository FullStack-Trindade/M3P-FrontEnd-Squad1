import React from 'react'
import { Container } from './MenuItem.style'

const MenuItem = ({ Icon, Text, To }) => {
  return (
    <Container to={To}>
      <Icon />
      {Text}
    </Container>
  )
}

export default MenuItem