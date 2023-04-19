import axios from "axios";
import {  useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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
  }, []);

  

  return (
    <Container>
      <h1>User Collection page</h1>
      <AddAlbum refreshAlbums={getAllAlbums} />
      <Row>
        {albums.map((album) => (
          <Col md={4} key={album._id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={album.image} alt={album.title} />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>
                  Country: {album.country}<br/>
                  City: {album.city}<br/>
                  Description: {album.description}
                </Card.Text>
                <Button variant="primary">View Album</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UserProfile;
