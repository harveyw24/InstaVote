import { useState } from 'react';
import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

const VoteSessionForm = () => {
    const { dispatch } = useVoteSessionContext();
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const voteSession = { title, options };

        const response = await fetch('http://localhost:4000/api/voteSession', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(voteSession)
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.error);
            setEmptyFields(data.emptyFields);
        } else {
            setError(null);
            setTitle('');
            setOptions([]);
            setEmptyFields([]);
            dispatch({type: 'CREATE_VOTING_SESSION', payload: data});
        }
    };

    const handleAddOption = () => {
        if (newOption.trim() !== '') {
            setOptions([...options, newOption]);
            setNewOption('');
        }
    };

    return (
        <div>
            <form className="create" onSubmit={handleSubmit} >
                <h3>Create a New Vote Session</h3>

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <label htmlFor="options">Options:</label>
                <input
                    type="text"
                    id="options"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className={emptyFields.includes('options') ? 'error' : ''}
                ></input>

                <button type="button" onClick={handleAddOption}>Add Option</button>

                {options.map((option, index) => (
                    <div key={index}>{option}</div>
                ))}

                <button type="submit">Create Vote Session</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default VoteSessionForm;
