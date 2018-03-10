import React, {Component} from 'react'
import { connect }from 'react-redux'
import {addNewGroup} from '../../reducers/groups'
//import shortid from 'shortid'
//import {saveStateToLocalStorage} from '../../helpers/utilities'
//import {appStore} from '../App'
import Header from '../Header'
import { Link } from 'react-router-dom'
import teams from '../../api/teams'
import styled from 'styled-components'
import {addTeamtoGroup, addMatchesToGroup} from '../../reducers/groups'
import shortid from 'shortid'
import {appStore} from '../App'
import {saveStateToLocalStorage} from '../../helpers/utilities'

const AddButton = styled.button`
  background-color: none;
  border:1px solid grey;
  outline: 0px;
  box-sizing: border-box;
  -webkit-padding-after: 5px;
  border-radius: 20px;
  margin-left: 10px;
`
const MatchList = styled.ul`
  list-style: none;
`

const MatchItem = styled.li`
  padding: 10px;
  background: honeydew;
`

const Subtitle = styled.h2`
  font-size: 18px;
`
const Wrapper = styled.div`
  padding: 20px;
`

class Group extends Component {
    state = {
        teamId:''
    }

    onChange = (event) => this.setState({ teamId: event.target.value })

    onSubmit = () => {
      if ( !this.props.group.teams.includes( this.state.teamId )){
          this.props.doAddTeamToGroup(this.props.group.id, this.state.teamId)
        }
    }

    componentWillReceiveProps(nextProps){
      const {teams,matches} = this.props.group
      if ( !this.areArraysEqual(teams,nextProps.group.teams) ||
            !this.areArraysEqual(matches, nextProps.group.matches)){
                saveStateToLocalStorage(appStore.getState())
            }
    }

    getMatchingTeams = (teams) => teams.filter(
      team => this.props.group.teams.includes(team.id)
    )

    areArraysEqual = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2)

    checkMatchUnique = (matches, newMatch, reverseMatch) => {
      let isUnique = true;

      matches.forEach(match => {
        if (this.areArraysEqual(match, newMatch) || this.areArraysEqual(match, reverseMatch) )
        isUnique = false;
      })

  return isUnique;
}

    generateMatches = () => {
      let matches = [];
      const matchingTeams = this.getMatchingTeams(teams)
      //console.log('MatchingTeams', matchingTeams);
        matchingTeams.forEach( team => {
          const firstTeamId = team.id;
          matchingTeams.forEach( team => {
            if (firstTeamId !== team.id) {
              const newMatch = [firstTeamId, team.id];
              const reverseMatch = [team.id, firstTeamId];
              const isMatchUnique = this.checkMatchUnique(matches, newMatch, reverseMatch);

              if (isMatchUnique) {
                matches = [...matches, newMatch]
              }
            }
          })
        })
        //console.log(matches);
        const matchesObjArray = matches.map( match => ({
              id : shortid.generate(),
              fteam : teams.find( team => team.id === match[0] ),
              steam : teams.find( team => team.id === match[1] )
            })
          )
        //console.log(matchesObjArray);
        this.props.doAddMatchesToGroup(this.props.group.id, matchesObjArray)
    }

    render(){
      console.log('State:',this.state);
      const matchingTeams = this.getMatchingTeams(teams)
      console.log('Matches:',matchingTeams);
        return(
            <div>
                <Header/>
                <Wrapper>
                <h1>{this.props.group.name}</h1>

                <select value={this.state.teamId} onChange={this.onChange}>
                    {teams.map((team)=>
                          (
                            <option key={team.id} value={team.id}>{team.name} </option>
                          )
                      )}
                </select>
                <AddButton onClick={this.onSubmit} >+</AddButton>
                <Subtitle>Teams</Subtitle>
                <ul>
                  {matchingTeams.map(team => <li key={team.id}>{team.name}</li>)}
                </ul>
                <AddButton onClick={this.generateMatches} >Generate matches</AddButton>
                <Subtitle>Matches</Subtitle>
                <MatchList>
                  { this.props.group.matches &&
                    this.props.group.matches.map((match, i)=>(
                      <MatchItem key={match.id}>{`${i+1} - ${match.fteam.name}  vs  ${match.steam.name}`}</MatchItem>
                    ))
                  }
                </MatchList>
                </Wrapper>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    group: state.groups.find( group => ownProps.match.params.groupId === group.id)
})

const mapDispatchToProps = dispatch => ({
    doAddTeamToGroup: (groupId, teamId) => dispatch(addTeamtoGroup(groupId,teamId)),
    doAddMatchesToGroup: (groupId, matches) => dispatch(addMatchesToGroup(groupId, matches))
})

export default connect(mapStateToProps, mapDispatchToProps)(Group)
