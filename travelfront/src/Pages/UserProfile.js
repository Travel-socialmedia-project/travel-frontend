import axios from "axios";
import {  useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddAlbum from "../components/AddAlbum";

function UserProfile() {
  
  const [albums, setAlbums] = useState([]);

  const { userId } = useParams();
  const storedToken = localStorage.getItem("authToken");

  const getAllAlbums = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}/albums`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setAlbums(response.data))
      .catch((e) => console.log("Error Getting Albums List", e));
  };

  useEffect(() => {
    getAllAlbums();
  }, []);///add []

  if (albums.length === 0) {
    return <div>Loading albums...</div>;
  } 

  return (
    <>
      <h1>User Collection page</h1>
      <AddAlbum refreshAlbums={getAllAlbums} />
      {albums.map((album) => (
        <div key={album._id}>
          <h2>{album.title}</h2>
          <img src={album.image} alt={album.title} />
          <p>Country: {album.country}</p>
          <p>City: {album.city}</p>
          <p>Description: {album.description}</p>
        </div>
      ))}
    </>
  );
}

export default UserProfile;
