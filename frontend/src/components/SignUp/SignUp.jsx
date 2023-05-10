import './SignUp.css'
import { Button, Form, Input, InputNumber } from 'antd';
// import md5 from 'js-md5';
import axios from 'axios';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },

};
/* eslint-enable no-template-curly-in-string */
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const onFinish = (values) => {
  // console.log(values.user);
  const { user } = values;
  const newUser = { ...user };
  // newUser.password = md5(newUser.password);
  // console.log(newUser);
  axios
    .post(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, newUser)
    .then(() => {
      // setFormValues(DEFAULT_FORM_VALUES);
      window.location.href = `/login`;
    })
    .catch((error) => {
      onFinishFailed('An error occured while creating new user.');
      console.error(error);
    });


};
const SignUp = () => (
  <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    className='SignForm'
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          required: true,
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'name']}
      label="Username"
      rules={[
        {
          required: true,
          //   type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'firstname']}
      label="First Name"
      rules={[
        {
          //   type: 'number',
          //   min: 0,
          //   max: 99,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'lastname']}
      label="Last Name"
      rules={[
        {
          //   type: 'number',
          //   min: 0,
          //   max: 99,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'password']}
      label="Password"
      rules={[
        {
          //   type: 'number',
          //   min: 0,
          //   max: 99,
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      name={['verify', 'password']}
      label="Confirm"
      rules={[
        {
          required: true,
          type: 'password',
          //   min: 0,
          //   max: 99,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(['user', 'password']) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    {/* <Form.Item name={['user', 'website']} label="Website">
      <Input />
    </Form.Item> */}
    {/* <Form.Item name={['user', 'introduction']} label="Introduction">
      <Input.TextArea />
    </Form.Item> */}
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default SignUp;