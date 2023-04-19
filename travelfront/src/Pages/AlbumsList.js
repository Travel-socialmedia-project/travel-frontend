import { useState, useEffect } from "react";
import axios from 'axios';

import { Link } from "react-router-dom";
// 
import { Card, Button } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';

function AlbumList() {

  const storedToken = localStorage.getItem('authToken');
  const [albums, setAlbums] = useState([]);

  const getAllAlbums = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/albums`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setAlbums(response.data))
      .catch((e) => console.log("Error Getting Albums List", e));
  }

  useEffect(() => {
    getAllAlbums();
  }, []);

  return (
    <div className="container d-flex justify-content-center" style={{maxWidth: "35%", margin: "0 auto"}}>
      <div className="row">
        {albums.map((album) => (
          <div className="col-md-12 mb-4">
            <Card style={{ height: '100%' }}>
              <Card.Img
                variant="top"
                src={album.image}
                alt={album.title}
                className="custom-image-class"
                style={{ width: "80%", height: "500px" }}
              />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>
                  {album.country} - {album.user.name}
                </Card.Text>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/albums/${album._id}`}
                  className="mt-auto"
                >
                  Details
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        {!albums.length && (
          <div className="col-md-12 mb-4">
            <Card style={{ height: '400px', width: 'auto' }}>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card>
          </div>
        )}
      </div>

      <style>
        {`.custom-image-class {
          width: 50%;
          margin: 0 auto;
          display: block;
        }`}
      </style>

    </div>
  )
}

export default AlbumList;