import { format } from 'date-fns';
import { useVoteSessionContext } from '../hooks/useVoteSessionContext';

const VoteSessionDetails = ({ voteSession }) => {
    const { dispatch } = useVoteSessionContext();

    console.log(voteSession.createdAt);
    console.log(format(new Date(voteSession.createdAt), 'PPPpp'));
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:4000/api/voteSession/${voteSession._id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            return;
        }

        const data = await response.json();
        dispatch({type: 'DELETE_VOTING_SESSION', payload: data});
    }

    return (
        <div className="voteSession" key={voteSession._id}>
            <h2>{voteSession.title}</h2>
            <form>
                {voteSession.options.map((option, index) => (
                    <div key={index}>
                        <input type="checkbox" id={`option-${index}`} name={`option-${index}`} value={option} />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </form>
            <p>{ format(new Date(voteSession.createdAt), 'PPPpp') }</p>
            <span className="delete-button" onClick={handleDelete}>Delete</span>
        </div>
    );
}

export default VoteSessionDetails;