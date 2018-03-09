import React, { Component } from 'react'
import teams from '../../api/teams'


const Teams = () => (
    <div>
        { teams.map(team => (
        <div key={team.id}>{team.name}</div>
        ))}
    </div>
)

export default Teams