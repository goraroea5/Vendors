import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  height: 100px;
`;

const MenuBar = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
`;

function Navbar({search , setSearch}) {
  return (
    <Header>
      <MenuBar>
        <TextField 
          fullWidth value={search} 
          onChange={(e) => {setSearch(e.target.value)}} 
          variant="outlined" />
      </MenuBar>
    </Header>
  ) 
}

export default Navbar

