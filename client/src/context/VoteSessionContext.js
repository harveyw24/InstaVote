import { createContext } from 'react';
import { useReducer } from 'react';

export const VoteSessionContext = createContext();

export const voteSessionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VOTING_SESSION':
            return {
                votingSessions: action.payload
            };
        case 'CREATE_VOTING_SESSION':
            return {
                votingSessions: [action.payload, ...state.votingSessions]
            };
        case 'DELETE_VOTING_SESSION':
            return {
                votingSessions: state.votingSessions.filter(voteSession => voteSession._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export const VoteSessionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(voteSessionReducer, { votingSessions: null });

    return (
        <VoteSessionContext.Provider value={{...state, dispatch}}>
            {children}
        </VoteSessionContext.Provider>
    )
}