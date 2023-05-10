import React, { useEffect, useState } from 'react';
import { List, Rate } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentList() {
  const { mvid } = useParams();
  const [comments, setComments] = useState([]);
  const token = sessionStorage.getItem('JWTtoken');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/comment/{mvid}`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mvid, token]);

  return (
    <List
      itemLayout="vertical"
      locale={{ emptyText: 'No comments yet' }}
      dataSource={comments}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={item.username}
            description={
              <>
                <p>{item.content}</p>
                <Rate disabled value={item.rank} />
              </>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default CommentList;
