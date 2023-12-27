import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import useFetch from '../hooks/useFetch';
// import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

const VoteSession = () => {
    const { nanoId } = useParams();
    const { data: voteSession, loading, error } = useFetch(`http://localhost:4000/api/voteSession/${nanoId}`);

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [voteError, setError] = useState(null);

    useEffect(() => {
        if (!Cookies.get('userId')) {
            Cookies.set('userId', Math.random().toString(36).slice(2) + (new Date()).getTime().toString(36));
        }
    }, []);

    const handleOptionChange = (event) => {
        const { checked, value } = event.target;
      
        setSelectedOptions(prevOptions => {
            if (checked) {
                return [...prevOptions, value];
            } else {
                return prevOptions.filter(option => option !== value);
            }
        });
    };      

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: set to server url
        const response = await fetch(`http://localhost:4000/api/vote/${nanoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cookieId: Cookies.get('userId'), options: selectedOptions })
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            return;
        }

        setError(null);
        return data;
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message} </div>;

    return (
        <div className="voteSession" key={voteSession._id}>
            <h2>{voteSession.title}</h2>

            <form>

                {voteSession.options.map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" id={`option-${index}`} name={`option-${index}`} value={option} onChange={handleOptionChange} />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}

                <button type="button" onClick={handleSubmit}>Submit Vote</button>
                {voteError && <div className="error">{voteError}</div>}

            </form>

            <p>{ formatDistanceToNow(new Date(voteSession.createdAt), {addSuffix: true}) }</p>
        </div>
    );
}

export default VoteSession;