import { useState, useEffect } from "react";
import axios from 'axios';
import AddAlbum from "../components/AddAlbum";
import { Link } from "react-router-dom";

function AlbumList(){
    
  const storedToken = localStorage.getItem('authToken');
  const [albums, setAlbums] = useState([]);
  
  

  const getAllAlbums = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/albums`,{ headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => setAlbums(response.data))
    
    .catch((e) => console.log("Error Getting Albums List",e));
  }

  useEffect(() => {
    getAllAlbums();
  }, []);///add []



  return (
    <div>

      <h1>Album list</h1>
      <AddAlbum refreshAlbums={getAllAlbums} />
      <div>
        {albums.map((album) => (
          <div key={album._id} {...album}>
            <p>{album.title}</p>
            <img src={album.image} alt={album.title} />
            <p>{album.country}</p>
            <p>{album.user.name}</p>
            {console.log(album.image)}
            <Link to={`/albums/${album._id}`} ><button>Details</button></Link>
          </div>
          
        ))}
      </div>
    </div>
  );
}
 
export default AlbumList;
// {/* <div className="AlbumCard card"> */}
    
// {/* <Link to={`/albums/${_id}`}>
//   <h3>{title}</h3>
// </Link>
// <p style={{ maxWidth: "400px" }}>{description} </p>
// </div> */}



