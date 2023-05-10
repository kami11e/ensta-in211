import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Rate, Row } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddComment() {
  const { mvid } = useParams();
  const [form] = Form.useForm();
  const [value, setValue] = useState(3);
  const token = sessionStorage.getItem('JWTtoken');
  const myplaceholder =
    token !== null ? 'Please enter your comment' : 'Please login first';
  const onFinish = (values) => {
    if (values.comment.length < 10) {
      Modal.warning({
        content: 'The comment length must be greater than 10!',
      });

      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKDEND_URL}/movies/comment`,
        {
          mvid,
          content: values.comment,
          rank: value,
        },
        {
          headers: {
            token: sessionStorage.getItem('JWTtoken'),
          },
        }
      )
      .then(() => {
        Modal.success({
          content: 'Comment submitted successfully!',
        });
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
        Modal.error({
          title: error.status_message,
          content: error.response.data.status_message,
        });
      });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={18}>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: 'Please input your comment!' }]}
          >
            <Input placeholder={myplaceholder} />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="rate">
            <Rate
              value={value}
              onChange={(newvalue) => {
                setValue(newvalue);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default AddComment;
