import { useEffect, useState } from 'react';
// import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

import VoteSessionDetails from '../components/VoteSessionDetails';
import VoteSessionForm from '../components/VoteSessionForm';

const Home = () => {
    const [view, setView] = useState('home');
    // const { votingSessions, dispatch } = useVoteSessionContext();

    // useEffect(() => {
    //     const fetchVotingSessions = async () => {
    //         const response = await fetch('http://localhost:4000/api/voteSession');
    //         if (!response.ok) {
    //             console.error(`Error: ${response.status}`);
    //             return;
    //         }
        
    //         const data = await response.json();
    //         dispatch({type: 'SET_VOTING_SESSION', payload: data});
    //     }
    //     fetchVotingSessions();
    // }, [dispatch]);

    let content;
    if (view === 'home') {
        // content = (
        //     <div className="votingSessions">
        //         {votingSessions && votingSessions.map(voteSession => (
        //             <VoteSessionDetails key={voteSession._id} voteSession={voteSession}/>
        //         ))}
        //     </div>
        // );
    } else if (view === 'create') {
        content = <VoteSessionForm />;
    } else if (view === 'vote') {
        const handleRedirect = (event) => {
            event.preventDefault();
            if (nanoId) {
                window.location.href = `/voteSession/${nanoId}`;
            }
        };

        let nanoId;
        content = (
            <form onSubmit={handleRedirect}>
                <input type="text" value={nanoId} placeholder="Enter Vote Session Code" />
                <button type="submit">Go</button>
            </form>
        );
    }

    return (
        <div className="Home">
            <button onClick={() => setView('create')}>Create a new vote</button>
            <button onClick={() => setView('vote')}>Vote in an existing vote</button>
            {content}
        </div>
    );



    // const { votingSessions, dispatch } = useVoteSessionContext();

    // useEffect(() => {
    //     const fetchVotingSessions = async () => {
    //         const response = await fetch('http://localhost:4000/api/voteSession');
    //         if (!response.ok) {
    //             console.error(`Error: ${response.status}`);
    //             return;
    //         }
        
    //         const data = await response.json();
    //         dispatch({type: 'SET_VOTING_SESSION', payload: data});
    //     }
    //     fetchVotingSessions();
    // }, [dispatch]);

    // return (
    //     <div className="Home">
    //         <div className="votingSessions">
    //             {votingSessions && votingSessions.map(voteSession => (
    //                 <VoteSessionDetails key={voteSession._id} voteSession={voteSession}/>
    //             ))}
    //         </div>
    //         <VoteSessionForm />
    //     </div>
    // );
}

export default Home;