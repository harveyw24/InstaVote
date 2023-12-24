import { format } from 'date-fns';

const VoteSessionDetails = ({ voteSession }) => {
    const createdAt = format(new Date(voteSession.createdAt), 'PPPpp');

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
            <p>{createdAt}</p>
        </div>
    );
}

export default VoteSessionDetails;