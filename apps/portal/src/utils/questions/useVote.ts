import { useState } from 'react';

export const enum VoteState {
  NO_VOTE,
  UPVOTE,
  DOWNVOTE,
}

export const useVote = () => {
  const [voteState, setVoteState] = useState(VoteState.NO_VOTE);

  const handleUpvote = (id: string, voteState) => {
    //
  };

  const handleDownvote = (id: string) => {};

  return [handleUpvote, handleDownvote, voteState] as const;
};
