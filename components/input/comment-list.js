import { Fragment } from 'react';
import classes from './comment-list.module.css';

function CommentList(props) {
  const comments = props.comments

  if (!comments || comments.length <= 0) {
    return <div></div>
  }
  return (
    <ul className={classes.comments}>
      {props.comments && props.comments.map((item) => {
        return (
          <li key={item.id}>
            <p>{item.comment}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        )
      })}

    </ul>
  );
}

export default CommentList;
