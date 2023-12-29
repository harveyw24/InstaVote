import { createContext } from 'react';
import { useReducer } from 'react';

export const VoteSessionContext = createContext();

export const voteSessionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_VOTE_SESSION':
            return {
                voteSession: action.payload
            };
        case 'ADD_VOTE':
            return {
                voteSession: {
                    ...state.voteSession,
                    votes: [...state.voteSession.votes, action.payload]
                }
            };
        case 'MODIFY_VOTE':
            return {
                voteSession: {
                    ...state.voteSession,
                    votes: state.voteSession.votes.map(vote => {
                        if (vote.cookieId === action.payload.cookieId) {
                            return action.payload;
                        }
                        return vote;
                    })
                }
            };
        case 'DELETE_VOTE':
            return {
                voteSession: {
                    ...state.voteSession,
                    votes: state.voteSession.votes.filter(vote => vote.cookieId !== action.payload.cookieId)
                }
            };
        // case 'CREATE_VOTING_SESSION':
        //     return {
        //         voteSession: [action.payload, ...state.voteSession]
        //     };
        // case 'DELETE_VOTING_SESSION':
        //     return {
        //         voteSession: state.voteSession.filter(voteSession => voteSession._id !== action.payload._id)
        //     };
        default:
            return state;
    }
}

export const VoteSessionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(voteSessionReducer, { voteSession: null });

    return (
        <VoteSessionContext.Provider value={{...state, dispatch}}>
            {children}
        </VoteSessionContext.Provider>
    )
}