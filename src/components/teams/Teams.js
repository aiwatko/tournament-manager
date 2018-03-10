import React, { Component } from 'react'
import teams from '../../api/teams'
import Header from '../Header'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px;
`


const Teams = () => (
    <div>
      <Header/>
      <Wrapper>
        { teams.map(team => (
        <div key={team.id}>{team.name}</div>
        ))}
      </Wrapper>
    </div>
)

export default Teams
