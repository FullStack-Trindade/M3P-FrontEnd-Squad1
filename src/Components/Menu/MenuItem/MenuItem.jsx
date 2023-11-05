import React from 'react'
import { Container } from './MenuItem.style'

const MenuItem = ({ Icon, Text, To, onClick }) => {
  return (
    <Container to={To} onClick={onClick}>
      <Icon />
      {Text}
    </Container>
  )
}

export default MenuItem