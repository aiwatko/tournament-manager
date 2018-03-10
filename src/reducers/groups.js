import {getStateFromLocalStorage} from '../helpers/utilities'

export const NEW_GROUP = 'NEW_GROUP'
export const ADD_TEAM_TO_GROUP = 'ADD_TEAM_TO_GROUP'
export const ADD_MATCHES_TO_GROUP = 'ADD_MATCHES_TO_GROUP'



/* I’m an action creator (LEVEL 1!)  */
export const addNewGroup = (group) => ({
 type: NEW_GROUP,
 group
})

export const addMatchesToGroup = (groupId, matches) => (
  {
    type: ADD_MATCHES_TO_GROUP,
    groupId,
    matches
  }
)

export const addTeamtoGroup = (groupId, teamId) => ({
    type: ADD_TEAM_TO_GROUP,
    groupId,
    teamId
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
         groups: state.groups.map((group) => group.id === action.groupId
            ? {
                ...group,
                teams: [...group.teams, action.teamId]
             }
            : group
        )
       }
  }
  case ADD_MATCHES_TO_GROUP: {
      return {
           ...state,
           groups: state.groups.map((group) => group.id === action.groupId
              ? {
                  ...group,
                  matches: action.matches
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
