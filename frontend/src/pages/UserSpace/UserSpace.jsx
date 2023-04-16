import { useParams } from 'react-router-dom';
import './UserSpace.css'
import { useState } from 'react';

// const useNotLogin=()=>{
//     const [loginError, setLoginError] = useState(null);
//     const displayLoginErrorMsg=()=>{
//         setLoginError('You are not logged in.');
//     }

//     const notLogin=()=>{
//         displayLoginErrorMsg();
//         setTimeout(()=>{
//             setLoginError(null);
//             window.location.href=`/login`;
//         }, 3000);
//     }
//     return {notLogin, loginError}

// }


function UserSpace(){
    // const {uid} =useParams();
    // const {notLogin, loginError} = useNotLogin();
    const uid=localStorage.getItem("uid");
    const isLogin=localStorage.getItem("isLogin");
    const name=localStorage.getItem("name");
    // const firstname=localStorage.getItem("firstname");
    // const lastname=localStorage.getItem("lastname");
    return(
        <div>
            <h1 style={{ fontSize:20, textAlign:'center',marginLeft:15}}>{name}'s personal space:</h1>
            <hr style={{ borderTop: "1px solid #fff ", marginLeft: 10, marginRight: 10, alignItems:'center', marginTop: -10}}></hr>

        </div>
        

    );
}


export default UserSpace;