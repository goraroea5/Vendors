import React from 'react'
import { TextField } from '@material-ui/core';
import styled from 'styled-components'

const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: red;
`;

function Navbar() {
  return (
    <Header>
      <TextField />
    </Header>
  ) 
}

export default Navbar

