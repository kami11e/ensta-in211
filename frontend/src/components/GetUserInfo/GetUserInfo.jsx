import { useEffect, useState } from 'react';
import './GetUserInfo.css';
import axios from 'axios';



const useGetUserInfo = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [userInfoLoadingError, setUserInfoLoadingError] = useState(null);
    useEffect(()=>{
        axios
            .get(`${import.meta.env.VITE_BACKDEND_URL}/users/userInfo`,{
                headers: {
                    token:sessionStorage.getItem("JWTtoken"),
                }
            })
            .then((response)=>{
                console.log(response);
            })
    },[]);
    return {userInfo, userInfoLoadingError};

};



function GetUserInfo() {
    const {userInfo, userInfoLoadingError} = useGetUserInfo();
    // const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    // const { searchFilm, userSearchError, filmSearchSuccess } = useSearchFilm();
    if(sessionStorage.getItem("JWTtoken")===null){
        window.location.href=`/login`;
    }
    return (
      <div>


        {/* {filmSearchSuccess !== null && (
          <div className="film-search-success">{filmSearchSuccess}</div>
        )}
        {filmSearchError !== null && (
          <div className="film-search-error">{filmSearchError}</div>
        )} */}
      </div>
    );
  }

export default GetUserInfo;