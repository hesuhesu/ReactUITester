import React from 'react';
import styled from 'styled-components';

const Comment: React.FC = () => {
    return (
        <CommentContainer>
            <h2>Comment</h2>
            <button>댓글 쓰기</button>
        </CommentContainer>
    );
};

export default Comment;

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    bottom: 5rem;
    width: 50vw;
    flex-direction: column;

    h2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 
    }
`;