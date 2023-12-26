import { VoteSessionContext } from "../context/VoteSessionContext";
import { useContext } from "react";

export const useVoteSessionContext = () => {
    const context = useContext(VoteSessionContext);
    
    if (!context) {
        throw new Error('useVoteSessionContext must be used within a VoteSessionContextProvider');
    }

    return context;
}