import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function AlbumDetails() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);

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
  }, []);

  const deleteProject = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`)
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
          <img src="${album.image}" alt={album.title} />
          <p>Country: {album.country}</p>
          <p>City: {album.city}</p>
          <p>Description: {album.description}</p>
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
