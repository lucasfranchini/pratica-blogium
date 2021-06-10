import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const promise = axios.get(`http://localhost:4000/posts/${postId}`);
    promise.then(res =>{
      setPost(res.data);
      setTitle(res.data.title);
      setCoverUrl(res.data.coverUrl);
      setContent(res.data.content);
    });
    
  }, [postId]);

  function onPostSaveButtonClick() {
    const post = {title,coverUrl,content};
    const promise = axios.put(`http://localhost:4000/posts/${postId}`,post);
    promise.then(()=>history.push(`/posts/${postId}`));
  }

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
