import { useEffect } from 'react';
import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

import VoteSessionDetails from '../components/VoteSessionDetails';
import VoteSessionForm from '../components/VoteSessionForm';

const Home = () => {
    const { votingSessions, dispatch } = useVoteSessionContext();

    useEffect(() => {
        const fetchVotingSessions = async () => {
            const response = await fetch('http://localhost:4000/api/voteSession');
            if (!response.ok) {
                console.error(`Error: ${response.status}`);
                return;
            }
        
            const data = await response.json();
            dispatch({type: 'SET_VOTING_SESSION', payload: data});
        }
        fetchVotingSessions();
    }, [dispatch]);

    return (
        <div className="Home">
            <div className="votingSessions">
                {votingSessions && votingSessions.map(voteSession => (
                    <VoteSessionDetails key={voteSession._id} voteSession={voteSession}/>
                ))}
            </div>
            <VoteSessionForm />
        </div>
    );
}

export default Home;