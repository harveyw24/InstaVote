import { useEffect, useState } from 'react';
import VoteSessionDetails from '../components/VoteSessionDetails';
import VoteSessionForm from '../components/VoteSessionForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/home.css';

const Home = () => {
    const [view, setView] = useState('home');
    const [nanoId, setNanoId] = useState('');
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

    const handleBackClick = () => {
        setView('home');
    }

    let content;
    if (view === 'home') {
        content = (
            <div className="homeOptions">
                <button onClick={() => setView('create')}>Create new vote</button>
                <button onClick={() => setView('vote')}>Vote with code</button>
            </div>
        );
    } else if (view === 'create') {
        content = (
            <div className="createVote">
                <button className="backButton" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <VoteSessionForm />
            </div>
        );
    } else if (view === 'vote') {
        const handleRedirect = (event) => {
            event.preventDefault();
            if (nanoId) {
                window.location.href = `/voteSession/${nanoId}`;
            }
        };

        const handleInputChange = (event) => {
            setNanoId(event.target.value);
        };

        content = (
            <div className="voteCode">
                <button className="backButton" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <form onSubmit={handleRedirect}>
                    <input type="text" value={nanoId} onChange={handleInputChange} placeholder="enter vote code" />
                    <button type="submit">Go</button>
                </form>
            </div>
        );
    }

    return (
        <div className="Home">
            <div className="lander">
                <div className="welcome">
                    <h1>Create votes in seconds.</h1>
                    <p>Free, no signups required. Choose an option below to get started.</p>
                </div>
                {content}
            </div>
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