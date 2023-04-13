import './FilmDetail.css';
// import * as React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function FilmDetail() {
  // const { testvalue } = useParams();
  // const [user, setUser] = React.useState(null)
  const { mvid } = useParams()

  // React.useEffect(() => {
  //   getProfile(handle)
  //     .then(setUser)
  // }, [handle])
  axios
      .get(`${import.meta.env.VITE_BACKDEND_URL}/users/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setUserCreationError('An error occured while creating new user.');
        console.error(error);
      });

  return (
    <div className="Users-Search">
      <h1>This film detail page, id={mvid}</h1>

    </div>
  );
}

export default FilmDetail;