import React from 'react'
import { Container } from './UserAddBtn.style'

const UserAddBtn = ({ Text, To }) => {
  return (
    <Container to={To}>
      {Text}
    </Container>
  )
}

export default UserAddBtn