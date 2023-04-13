import { useState, useEffect } from "react";
import axios from 'axios';
import AddAlbum from "../components/AddAlbum";
import { Link } from "react-router-dom";

function AlbumList(){
    

  const [albums, setAlbums] = useState([]);
  

  const getAllAlbums = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/albums`)
    .then((response) => setAlbums(response.data))
    .catch((e) => console.log("Error Getting Albums List",e));
  }

  useEffect(() => {
    getAllAlbums();
  }, []);

  if (albums.length === 0) {
    return <div>Loading albums...</div>;
  }

  return (
    <div>

      <h1>Album list</h1>
      <AddAlbum refreshAlbums={getAllAlbums} />
      <div>
        {albums.map((album) => (
          <div key={album._id} {...album}>
            <p>{album.title}</p>
            <p>{album.image}</p>
            <p>{album.country}</p>
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



