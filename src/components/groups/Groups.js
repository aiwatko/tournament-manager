import React, {Component} from 'react'
import { connect }from 'react-redux'
import {addNewGroup} from '../../reducers/groups'
import shortid from 'shortid'
import {saveStateToLocalStorage} from '../../helpers/utilities'
import {appStore} from '../App'
class Groups extends Component {
    state = {
        newGroup: ''
    }

    onChange = (event) => {
        this.setState(
            {
                newGroup: event.target.value
            }
        )
    }

    onSubmit = (e) => {
        e.preventDefault()
        const newGroup = {id: shortid.generate(), name: this.state.newGroup, teams: []}
        this.props.doAddNewGroup(newGroup)
    }

    componentWillReceiveProps(nextProps){
        console.log(appStore.getState())
        saveStateToLocalStorage(appStore.getState())        
    }
    
    render(){
        return(
            <div>
                <h1>New Group</h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" value={this.state.newGroup} onChange={this.onChange}/>
                    <button type="submit">Add Group</button>
                </form>
                <ul>
                    {this.props.groups.map((group) => (
                        <li key={group.id}>{group.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    groups: state.groups,
    state
})

const mapDispatchToProps = dispatch => ({
    doAddNewGroup: group => dispatch(addNewGroup(group))
})
   
export default connect(mapStateToProps, mapDispatchToProps)(Groups)