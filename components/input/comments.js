import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState()

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data.comments)
          setComments(data.comments)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async (commentData) => {
    const rawResponse = await fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify
        ({
          email: commentData.email,
          name: commentData.name,
          comment: commentData.text
        })
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
