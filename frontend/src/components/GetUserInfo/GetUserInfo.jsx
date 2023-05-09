import { useEffect, useState } from 'react';
import { Descriptions, Modal } from 'antd';
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
        Modal.error({
          title: error.status_message,
          content: error.response.data.status_message,
        });
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

  const userInfoItems = Object.keys(userInfo).map((key) => (
    <Descriptions.Item label={key} key={key}>
      {userInfo[key]}
    </Descriptions.Item>
  ));

  return (
    <Descriptions title="User Information" bordered>
      {userInfoItems}
    </Descriptions>
  );
}

export default GetUserInfo;
