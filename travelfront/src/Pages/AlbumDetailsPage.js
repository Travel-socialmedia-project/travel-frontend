import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function AlbumDetails(props) {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const storedToken = localStorage.getItem('authToken');

  const getAlbum = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`)
      .then((response) => {
        const oneAlbum = response.data;
        setAlbum(oneAlbum);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAlbum();
  },[] );

  const deleteProject = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`,{ headers: { Authorization: `Bearer ${storedToken}`} })
      .then(() => {
        navigate("/albums");
      })
      .catch((e) => console.log("error deleting album", e)); 
      
  };

  return (
    <div>
      <h1>Album Details page</h1>

      {album && (
        <>
          <h1>Title of the album: {album.title}</h1>
          <img src={album.image} alt={album.title} />
          <p>Country: {album.country}</p>
          <p>City: {album.city}</p>
          <p>Description: {album.description}</p>

{/* check the bellow line of code, 
route is not defined and we need 
to see the user name by its id
 and we are getting the userId */}

 <Link to={`/user/${album.user._id}/albums`}>
  <p>Created By: {album.user.name}</p>
</Link>
          
        </>
      )}
      <button onClick={deleteProject}> Delete Album </button>
      <Link to={`/updatealbum/${albumId}`}>
        <button>Update Album</button>
      </Link>
    </div>
  );
}

export default AlbumDetails;
