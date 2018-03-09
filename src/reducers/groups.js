import {getStateFromLocalStorage} from '../helpers/utilities'

export const NEW_GROUP = 'NEW_GROUP'
export const ADD_TEAM_TO_GROUP = 'ADD_TEAM_TO_GROUP'


/* I’m an action creator (LEVEL 1!)  */
export const addNewGroup = (group) => ({
 type: NEW_GROUP,
 group
})

export const addTeamtoGroup = (groupId, team) => ({
    type: ADD_TEAM_TO_GROUP,
    groupId,
    team
   })

// Initial state
const initialStateFromLocalStorage = getStateFromLocalStorage()
const initialState = initialStateFromLocalStorage 
  ? initialStateFromLocalStorage 
  : {
    groups: []
  } 


//ReducersgetStateFromLocalStorage
const GroupReducer = (state = initialState, action) => {
 switch (action.type) {
   case NEW_GROUP: {
     return {
          ...state, 
          groups: [...state.groups, action.group]
        }
   }
   case ADD_TEAM_TO_GROUP: {
    return {
         ...state, 
         groups: state.groups.map((group) => group.id === action.group.id
            ? { 
                ...group,
                teams: [...group.teams, action.team]
             }
            : group        
        )
       }
  }
   default:
     return state
 }
}

export default GroupReducer