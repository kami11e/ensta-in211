import React, { useEffect, useState } from 'react';
import { Col, List, Modal, Rate, Row } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CommentList() {
  const { mvid } = useParams();
  const [comments, setComments] = useState([]);
  const token = sessionStorage.getItem('JWTtoken');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/movies/comment/${mvid}`)
      .then((response) => {
        console.log(response);
        setComments(response.data.body);
      })
      .catch((error) => {
        console.error(error);
        Modal.error({
          title: error.message,
          content: error.response.data.status_message,
        });
      });
  }, [mvid, token]);

  return (
    <List
      itemLayout="vertical"
      locale={{ emptyText: 'No comments yet' }}
      dataSource={comments}
      renderItem={(item) => (
        <List.Item>
          <Row gutter={16}>
            <Col span={21}>
              <List.Item.Meta
                title={item.username}
                description={
                  <>
                    <p>{item.content}</p>
                  </>
                }
              />
            </Col>
            <Col span={3}>
              <Rate disabled value={item.rank} />
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
}

export default CommentList;
