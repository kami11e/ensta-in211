/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import axios from 'axios';
import './FilmSearch.css';

const DEFAULT_FORM_VALUES = {
  filmname: '',
};

const useSearchFilm = () => {
  const [filmSearchError, setFilmSearchSuccess] = useState(null);
  const [filmSearchSuccess, setFilmSearchError] = useState(null);
  const displaySearchSuccessMessage = () => {
    setFilmSearchSuccess('We have found this film');
    setTimeout(() => {
      setFilmSearchSuccess(null);
    }, 3000);
  };

  const searchFilm = (event, formValues, setFormValues) => {
    event.preventDefault();

    setFilmSearchError(null);
    if(formValues.filmname === ''){
        console.error('Missing film name, this field is required');
        return;
    }
    axios
        .then(()=> {
            displaySearchSuccessMessage();
            setFormValues(DEFAULT_FORM_VALUES);
        })
        .catch((error)=>{
            setFilmSearchError('An error occured while searching the film.');
            console.error(error);
        });
  };

  return {searchFilm, filmSearchError, filmSearchSuccess};
};

function FilmSearch() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { searchFilm, filmSearchError, filmSearchSuccess } = useSearchFilm();

  return (
    <div>
      <form
        className="user-form"
        onSubmit={(event) => searchFilm(event, formValues, setFormValues)}
      >
        <input
          className="user-input"
          type="filmname"
          placeholder="Enter film name"
          value={formValues.filmname}
          onChange={(event) =>
            setFormValues({ ...formValues, filmname: event.target.value })
          }
        />
        <button className="user-button" type="submit">
          Search Film
        </button>
      </form>
      {filmSearchSuccess !== null && (
        <div className="film-search-success">{filmSearchSuccess}</div>
      )}
      {filmSearchError !== null && (
        <div className="film-search-error">{filmSearchError}</div>
      )}
    </div>
  );
}


export default FilmSearch;