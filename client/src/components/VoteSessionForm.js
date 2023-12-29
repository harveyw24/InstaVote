import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const VoteSessionForm = () => {
    // const { dispatch } = useVoteSessionContext();
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
            return;
        }

        setError(null);
        setTitle('');
        setOptions([]);
        setEmptyFields([]);
        // dispatch({type: 'CREATE_VOTING_SESSION', payload: data});

        window.location.href = `/voteSession/${data.nanoId}`;
    };

    const handleAddOption = () => {
        if (newOption.trim() !== '') {
            setOptions([...options, newOption]);
            setNewOption('');
        }
    };

    const handleDeleteOption = (index) => {
        setOptions(options.filter((_, optionIndex) => optionIndex !== index));
    };

    return (
        <form className="create" onSubmit={handleSubmit} >
            {/* <h3>Create a New Vote Session</h3> */}

            <div className="formTitle">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />
            </div>
            
            <div className="formOptions">
                <label htmlFor="options">Options:</label>
                <input
                    type="text"
                    id="options"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    className={emptyFields.includes('options') ? 'error' : ''}
                />

                <button type="button" onClick={handleAddOption}>Add</button>

                <div className="voteOptions">
                    {options.map((option, index) => (
                        <div className="voteOption" key={index}>
                            {option}
                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteOption(index)} className="delete-icon" />
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit">Create Vote Session</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default VoteSessionForm;
