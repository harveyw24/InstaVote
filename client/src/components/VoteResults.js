const VoteResults = ({ voteSession }) => {
    // Compute the total number of votes for each option
    const optionCounts = voteSession.votes
        .flatMap(vote => vote.options)
        .reduce((counts, option) => {
            counts[option] = (counts[option] || 0) + 1;
            return counts;
        }, {});

    // Sort the options in descending order by vote count
    const sortedOptions = Object.entries(optionCounts)
        .sort(([, countA], [, countB]) => countB - countA)

    return (
        <div className="vote-results">
            <ul>
                {sortedOptions.map(([option, count]) => (
                    <li key={option}>
                        {option}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VoteResults;
