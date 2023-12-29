import { createContext } from 'react';
import { useReducer } from 'react';

export const VoteContext = createContext();

export const voteReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VOTES':
            return {
                votes: action.payload
            };
        case 'CREATE_VOTES':
            return {
                votes: [action.payload, ...state.votes]
            };
        case 'DELETE_VOTES':
            return {
                votes: state.votes.filter(vote => vote.cookieId !== action.payload.cookieId)
            };
        default:
            return state;
    }
}

export const VoteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(voteReducer, { votes: null });

    return (
        <VoteContext.Provider value={{...state, dispatch}}>
            {children}
        </VoteContext.Provider>
    )
}