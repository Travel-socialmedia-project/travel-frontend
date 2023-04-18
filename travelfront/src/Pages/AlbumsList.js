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




/* 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function CardExample() {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardExample;
*/



