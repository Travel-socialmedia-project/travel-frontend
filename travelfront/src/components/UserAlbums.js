import { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';
import {  useParams } from "react-router-dom";

function UserAlbums(){

  const storedToken = localStorage.getItem('authToken');
  const [albums, setAlbums] = useState([]);
  
  const { userId } = useParams();

  const getAllAlbums = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/my-albums/${userId}`,{ headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) =>{console.log(response.data) 
        setAlbums(response.data)})
    
    .catch((e) => console.log("Error Getting Albums List",e));
  }

  useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <div>
      <hr />
      <h1>My albums</h1>
      <div className="d-flex justify-content-around flex-wrap">
        {albums.map((album) => (
          <Card key={album._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={album.image} alt={album.title} />
            <Card.Body>
              <Card.Title>{album.title}</Card.Title>
              <Card.Text>
                {album.country}
              </Card.Text>
             
            </Card.Body>
          </Card>
        ))}
        {!albums.length && (
          <Card style={{ width: '18rem' }}>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
          </Card>
        )}
      </div>
    </div>
  );
}

export default UserAlbums;