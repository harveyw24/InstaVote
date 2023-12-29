import { useState } from 'react';
import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

const VoteForm = ({ setHasVoted, voteSession, cookieId }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [voteError, setError] = useState(null);
    const { dispatch } = useVoteSessionContext();

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

        const vote = { cookieId, options: selectedOptions };

        // TODO: set to server url
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/vote/${voteSession.nanoId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vote)
        });

        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
            return;
        }

        setError(null);
        dispatch({type: 'ADD_VOTE', payload: vote})
        setHasVoted(true);
        return data;
    }

    return (
        <div className="voteForm">
                <form className="vote">
                    <div className="allOptions">
                        {voteSession.options.map((option, index) => (
                            <div className="voteOption" key={index}>
                                <input type="checkbox" id={`option-${index}`} name={`option-${index}`} value={option} onChange={handleOptionChange} />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))}
                    </div>

                    <button type="submit" onClick={handleSubmit}>Submit Vote</button>
                    {voteError && <div className="error">{voteError}</div>}

                </form>
        </div>
        
    )
}

export default VoteForm;