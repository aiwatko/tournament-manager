import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #eee;
  padding: 20px;
`
const Title = styled.h1`
    font-size: 24px;

`

const Menu = styled.ul`
  list-style: none;
  display: flex;
`

const MenuItem = styled.li`
    margin-right: 20px;
    a {
      text-decoration: none;
      cursor: pointer;
      &:hover{
        color:red;
      }
    }
`
const Header = () => (
    <HeaderWrapper>
      <div></div>
      <Title>Tournament Manager</Title>
      <Menu>
          <MenuItem>
            <Link to={'/groups/'}>Groups</Link>
          </MenuItem>
          <MenuItem>
            <Link to={'/teams/'}>Teams</Link>
          </MenuItem>
      </Menu>
    </HeaderWrapper>
  )
export default Header
