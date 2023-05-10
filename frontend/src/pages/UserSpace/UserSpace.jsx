import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import GetUserInfo from '../../components/GetUserInfo/GetUserInfo';
import MoviesTable from '../../components/MoviesTable/MoviesTable';

const useGetUserMyList = () => {
  const [userMyList, setUserMyList] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/mylist/`, {
        headers: {
          token: sessionStorage.getItem('JWTtoken'),
        },
      })
      .then((response) => {
        setUserMyList(response.data.result);
        console.log(response.data.result);
      })
      .catch((error) => {
        Modal.error({
          title: error.status_message,
          content: error.response.data.status_message,
        });
        console.error(error);
      });
  }, []);

  return { userMyList };
};

function UserSpace() {
  const { userMyList } = useGetUserMyList();
  const [page, setPage] = useState(1);

  return (
    <div>
      <GetUserInfo />
      <MoviesTable movieList={userMyList} page={page} setPage={setPage} />
    </div>
  );
}

export default UserSpace;
