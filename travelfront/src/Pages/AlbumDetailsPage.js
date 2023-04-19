import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AlbumDetails(props) {
  const { albumId, userId } = useParams(['albumId', 'userId']);
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
    <div style={{ marginBottom: "50px" }}>
      <hr />
      <h1>Album Details page</h1>

      {album && (
        <>
          <h1>Title of the album: {album.title}</h1>
          <img src={album.image} alt={album.title} />
          <p>Country: {album.country}</p>
          <p>City: {album.city}</p>
          <p>Description: {album.description}</p>


<p>Created By: </p>
 <Link to={`/my-albums/${userId}`}> 
 {/* in the previous line of code we get undifined instead of the real user id */}
  <p>{album.user.name}</p>
</Link>
          
        </>
      )}
      <Button onClick={deleteProject} variant="primary"> Delete Album </Button>
      <Link to={`/updatealbum/${albumId}`}>
        <Button variant="primary">Update Album</Button>
      </Link>
    </div>
  );
}

export default AlbumDetails;
