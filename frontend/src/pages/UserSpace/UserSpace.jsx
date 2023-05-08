import axios from 'axios';
import { useEffect, useState } from 'react';
import GetUserInfo from '../../components/GetUserInfo/GetUserInfo';
import MoviesTable from '../../components/MoviesTable/MoviesTable';

const useGetUserMyList = () => {
  const [userMyList, setUserMyList] = useState([]);
  const [userMyListLoadingError, setUserMyListLoadingError] = useState(null);
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
        setUserMyListLoadingError(
          'An error occured while fetching userMyList.'
        );
        console.error(error);
      });
  }, []);

  return { userMyList, userMyListLoadingError };
};

function UserSpace() {
  const { userMyList, userMyListLoadingError } = useGetUserMyList();
  const [page, setPage] = useState(1);

  return (
    <div>
      <GetUserInfo />
      <MoviesTable movieList={userMyList} page={page} setPage={setPage} />
    </div>
  );
}

export default UserSpace;
