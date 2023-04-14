import axios from 'axios';
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";


function UserProfile(props){
    const [ setUser] = useState(null);
    const {userId} = useParams();
    // const { user } = useContext 

    const getProfile = () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`)
          .then((response) => {
            const oneUser = response.data;
            setUser(oneUser);
          })
          .catch((error) => console.log(error));
      };
      console.log(userId);
    return(
        <>
           <h1> User Profile page</h1>
           <p>
          {userId.name}
           </p>
        </>
     
    )
    


}



export default UserProfile;