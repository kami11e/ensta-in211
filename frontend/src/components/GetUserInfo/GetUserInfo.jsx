import { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import './GetUserInfo.css';
import axios from 'axios';

const useGetUserInfo = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoLoadingError, setUserInfoLoadingError] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/userInfo`, {
        headers: {
          token: sessionStorage.getItem('JWTtoken'),
        },
      })
      .then((response) => {
        setUserInfo(response.data.result);
      })
      .catch((error) => {
        setUserInfoLoadingError('An error occured while fetching userInfo.');
        console.error(error);
      });
  }, []);

  return { userInfo, userInfoLoadingError };
};

function GetUserInfo() {
  const { userInfo, userInfoLoadingError } = useGetUserInfo();
  if (sessionStorage.getItem('JWTtoken') === null) {
    window.location.href = `/login`;
  }

  if (userInfoLoadingError !== null) {
    return <div className="users-loading-error">{userInfoLoadingError}</div>;
  }

  return (
    <Descriptions title="User Information" bordered>
      <Descriptions.Item label="ID">{userInfo.id}</Descriptions.Item>
      <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
      <Descriptions.Item label="Name">{userInfo.name}</Descriptions.Item>
      <Descriptions.Item label="First Name">
        {userInfo.firstname}
      </Descriptions.Item>
      <Descriptions.Item label="Last Name">
        {userInfo.lastname}
      </Descriptions.Item>
      <Descriptions.Item label="Password">
        {userInfo.password}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default GetUserInfo;
