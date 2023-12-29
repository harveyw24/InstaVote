import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import VoteForm from '../components/VoteForm';
import VoteResults from '../components/VoteResults';
import { useVoteSessionContext } from '../hooks/useVoteSessionContext';
import '../styles/voteSession.css';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const VoteSession = () => {
    const { nanoId } = useParams();
    const {voteSession, dispatch} = useVoteSessionContext();
    const [hasVoted, setHasVoted] = useState(false);
    // const { data: voteSession, loading, error } = useFetch(`http://localhost:4000/api/voteSession/${nanoId}`);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    
    const fetchVotingSession = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/voteSession/${nanoId}`);

        if (!response.ok) {
            setError(response.error);
            return;
        }
    
        const data = await response.json();
        setLoading(false);
        dispatch({type: 'SET_VOTE_SESSION', payload: data});
    }

    useEffect(() => {
        if (!Cookies.get('userId')) {
            Cookies.set('userId', Math.random().toString(36).slice(2) + (new Date()).getTime().toString(36));
        }

        setHasVoted(false);

        // Check if user has already voted
        fetch(`http://localhost:4000/api/vote/${nanoId}/${Cookies.get('userId')}`)
            .then(response => response.json())
            .then(data => {
                if (data.options && data.options.length > 0) {
                    setHasVoted(true);
                }
            })


        fetchVotingSession();
        setError(null);
    }, [nanoId, dispatch]);

    const handleCopy = async () => {
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    }

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error"> Error: {error.message} </div>;

    let content, title;
    if (hasVoted) {
        const uniqueVoters = new Set(voteSession.votes.map(vote => vote.cookieId)).size;
        title = <h1>Here are your results!</h1>
        content = <div className="vote-results-container">
            <VoteResults voteSession={voteSession}/>
            <div className="vote-info">
                <button onClick={fetchVotingSession}>Refresh</button>
                <p>Voters: {uniqueVoters}</p>
            </div>
        </div>
    } else {
        title = <h1>Cast your vote!</h1>
        content = <VoteForm 
            setHasVoted={setHasVoted}
            voteSession={voteSession}
            cookieId={Cookies.get('userId')}
        />
    }

    return (
        <div className="voteContent" key={voteSession._id}>
            {title}
            <div className="voteSession" key={voteSession._id}>
                <h2>
                    {voteSession.title}
                    <span className="copyId" onClick={handleCopy}>
                        <span className="copyIcon"><FontAwesomeIcon icon={faClipboard}/> </span>
                        <span className="nanoId">{voteSession.nanoId}</span>
                    </span>

                    <span className={`notification ${showNotification ? 'show' : ''}`}>copied!</span>
                </h2>

                {content}
            </div>
            <p>Created { formatDistanceToNow(new Date(voteSession.createdAt), {addSuffix: true}) }</p>
        </div>
    );
}

export default VoteSession;