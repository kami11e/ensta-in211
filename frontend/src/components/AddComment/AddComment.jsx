/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import axios from 'axios';
import './AddComment.css';
const DEFAULT_VALUES = {
  comment: '',
};

function AddComment() {
  const [comment, setComments] = useState(DEFAULT_VALUES);

  return (
    <>
      {/* <label> */}
      {/* Enter Movie Name */}
      <div class="add-comment">
        <textarea
          placeholder="Please enter your comment"
          class="input-comment"
          style={{ width: "100%", height: 48 }}
          onChange={(event) =>
            setComments({ ...comment, comment: event.target.value })
          }
        >
        </textarea>
      </div>
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