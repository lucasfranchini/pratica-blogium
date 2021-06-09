import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Comment from './Comment';
import AddComment from './AddComment';
import axios from 'axios';

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const promise = axios.get(`http://localhost:4000/posts/${postId}/comments`);
    promise.then(res=>{setComments(res.data);})
  }, [postId]);

  function loadComments (newcomment){
    setComments([...comments,newcomment])
  }

  return (
    <Container>
      <Title>Comments</Title>
      {
        comments.length > 0
         ? comments.map(c => <Comment comment={c} key={c.id} />)
         : "No comments yet. Be the first to comment!"
      }
      <AddComment postId={postId} loadComments={loadComments} />
    </Container>
  );
}

const Title = styled.h1`
  font-size: 1.6em;
  border-bottom: 1px solid var(--color-devider-light_gray);
  padding-bottom: 10px;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px 40px;
  max-width: 740px;
  font-family: 'Merriweather', serif;
  font-size: 18px;
  line-height: 1.58;
  letter-spacing: -0.004em;
`;
