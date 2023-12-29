import { VoteContext } from "../context/VoteContext";
import { useContext } from "react";

export const useVoteContext = () => {
    const context = useContext(VoteContext);
    
    if (!context) {
        throw new Error('useVoteContext must be used within a VoteContextProvider');
    }

    return context;
}