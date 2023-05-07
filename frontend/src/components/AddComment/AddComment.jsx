/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import axios from 'axios';
import './AddComment.css';
import { useParams } from 'react-router-dom';
const DEFAULT_VALUES = {
  mvid: -1,
  content: '',
};

const useAddComment = () => {
  const [addCommentError, setAddCommentError] = useState(null);
  const [addCommentSuccess, setAddCommentSuccess] = useState(null);
  const displayAddCommentSuccessMessage = () => {
    setAddCommentSuccess('Your comment has been submitted.');
    setTimeout(() => {
      setAddCommentSuccess(null);
    }, 3000);
  };
  const addComment = (event, comment, setComments) => {
    event.preventDefault();
    setAddCommentError(null);
    console.log(comment);
    if (comment.content.length < 10) {
      console.error('Your comment should have more then 10 characters.');
      setAddCommentError('Your comment should have more then 10 characters.');
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/comment`, comment, {
        headers: {
          token: sessionStorage.getItem("JWTtoken")
        }
      })
      .then(() => {
        displayAddCommentSuccessMessage();
        setComments(DEFAULT_VALUES);
      })
      .catch((error) => {
        setAddCommentError('An error occured while adding comment.');
        console.error(error);
      });
  };
  return { addComment, addCommentError, addCommentSuccess };
}

function AddComment() {
  const [comment, setComments] = useState(DEFAULT_VALUES);
  const { addComment, addCommentError, addCommentSuccess } = useAddComment();
  const { mvid } = useParams();
  console.log(mvid);
  const token = sessionStorage.getItem("JWTtoken");
  const myplaceholder = token !== null ? "Please enter your comment" : "Please login first";
  return (
    <>
      {/* <label> */}
      {/* Enter Movie Name */}
      <form
        className='add-comment-form'
        onSubmit={(event)=>addComment(event, comment, setComments)}
      >
        <div class="add-comment">
          <textarea
            placeholder={myplaceholder}
            class="input-comment"
            style={{ width: "100%", height: 48 }}
            onChange={(event) =>
              setComments({ ...comment, content: event.target.value, mvid:mvid })
            }
          >
          </textarea>
        </div>
        {(token!==null) && (
          <button className="add-comment-button" type="submit">
          Submit
        </button>
        )}
        
      </form>

      {/* <input
          name="input-comment"
          placeholder="Enter ..."
          value={AddComment.AddComment}
          onChange={(event) =>
            setAddComments({ ...AddComment, AddComment: event.target.value })
          }
        /> */}
      {/* </label> */}
      {/* <p>{comment.comment}</p> */}
    </>
  );
}


export default AddComment;