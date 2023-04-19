import { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from "react-router-dom";

function MyAlbums(){

  const storedToken = localStorage.getItem('authToken');
  const [albums, setAlbums] = useState([]);

  const getAllAlbums = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/my-albums`,{ headers: { Authorization: `Bearer ${storedToken}`} })
    .then((response) => setAlbums(response.data))
    .catch((e) => console.log("Error Getting Albums List",e));
  }

  useEffect(() => {
    getAllAlbums();
  }, []);

  const cardStyle = {
    width: '18rem',
    height: 'auto',
    marginBottom: '1rem',
  };

  const cardImgStyle = {
    height: '20rem', /* adjust height as needed */
    objectFit: 'cover',
  };

  const cardTextStyle = {
    height: '3rem', /* adjust height as needed */
    overflow: 'hidden',
  };

  const cardTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const btnStyle = {
    alignSelf: 'center',
  };

  return (
    <div>
      <hr />
      <h1>My albums</h1>
      <div className="d-flex justify-content-around flex-wrap">
        {albums.map((album) => (
          <Card key={album._id} style={cardStyle}>
            <Card.Img variant="top" src={album.image} alt={album.title} style={cardImgStyle} />
            <Card.Body style={cardBodyStyle}>
              <Card.Title style={cardTitleStyle}>{album.title}</Card.Title>
              <Card.Text style={cardTextStyle}>
                {album.country}
              </Card.Text>
              <Button variant="primary" as={Link} to={`/albums/${album._id}`} style={btnStyle}>
                Details
              </Button>
            </Card.Body>
          </Card>
        ))}
        {!albums.length && (
          <Card style={cardStyle}>
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

export default MyAlbums;