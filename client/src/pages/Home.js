import { useEffect, useState } from 'react';

import VoteSessionDetails from '../components/VoteSessionDetails';

const Home = () => {

    const [votingSessions, setVotingSessions] = useState(null);

    useEffect(() => {
        const fetchVotingSessions = async () => {
            const response = await fetch('http://localhost:4000/api/voteSession');
            if (!response.ok) {
                console.error(`Error: ${response.status}`);
                return;
            }
        
            const data = await response.json();
            setVotingSessions(data);
        }
        fetchVotingSessions();
    }, []);

    return (
        <div className="Home">
            <div className="votingSessions">
                {votingSessions && votingSessions.map(voteSession => (
                    <VoteSessionDetails key={voteSession._id} voteSession={voteSession}/>
                ))}
            </div>
        </div>
    );
}

export default Home;