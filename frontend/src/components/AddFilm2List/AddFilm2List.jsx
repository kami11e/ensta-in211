import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import axios from 'axios';
import './AddFilm2List.css';

const DEFAULT_FORM_VALUES = {
    uid: null,
    mvid: null,
};
const useAddMovie = () => {
    const [addMovieError, setAddMovieError] = useState(null);
    const [addMovieSuccess, setAddMovieSuccess] = useState(null);
    const isLogin = localStorage.getItem("isLogin");

    const displayAddMovieSuccessMessage = () => {
        setAddMovieSuccess('Movie successfully added to my list.');
        setTimeout(() => {
            setAddMovieSuccess(null);
        }, 3000);
    };
    const addMovie = (event, formValues, setFormValues) => {
        event.preventDefault();

        // setFormValues(Values);
        console.log(formValues);
        if (!isLogin || formValues.uid === null || formValues.mvid === null) {
            setAddMovieError('You are not logged in, please login first.')
            // window.location.href='/login';
            return;
        }
        // const Values={
        //   uid: uId,
        //   mvid:mvId
        // };
        // console.log(Values);

        
        // setFormValues({ ...formValues, mvid: mvId });
        setAddMovieError(null);

        axios
            .post(`${import.meta.env.VITE_BACKDEND_URL}/mylist/new`, formValues)
            .then(() => {
                displayAddMovieSuccessMessage();
                setFormValues(DEFAULT_FORM_VALUES);
            })
            .catch((error) => {
                setUserCreationError('An error occured while adding to the list.');
                console.error(error);
            });



    };
    return { addMovie, addMovieError, addMovieSuccess }

}

function AddFilm2List({mvid}) {
    // const { mvid } = useParams();
    const uid = localStorage.getItem("uid");
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const { addMovie, addMovieError, addMovieSuccess } = useAddMovie();
    const Values = {
        uid: uid,
        mvid: mvid
    };
    // setFormValues(Values);
    useEffect(()=>{
        setFormValues(Values);
    },[]);

    return (
        <div>
            <form
                className="add-user-form"
                onSubmit={(event) => addMovie(event, formValues, setFormValues)}
            >
                <button className="add-film2list-button" type="submit">
                    Add to my movie list
                </button>
            </form>
            {addMovieError !== null && (
                <div className="user-creation-success">{addMovieError}</div>
            )}
            {addMovieSuccess !== null && (
                <div className="user-creation-error">{addMovieSuccess}</div>
            )}
        </div>
    );
}

export default AddFilm2List;
