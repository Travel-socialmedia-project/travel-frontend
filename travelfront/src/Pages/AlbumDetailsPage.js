import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Card, Image } from "react-bootstrap";

function AlbumDetails(props) {
  const { albumId, userId } = useParams(['albumId', 'userId']);
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const storedToken = localStorage.getItem('authToken');
  


console.log(storedToken);

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
    <div style={{ paddingTop: "30px", paddingDown: "50px" }}>
    <div className="container mt-5">
      <h1 className="text-center mb-5">Album Details</h1>
      {album && (
        <>
          <Card className="mb-3">
            <div className="row no-gutters">
              <div className="col-md-4">
                <Image src={album.image} alt={album.title} thumbnail />
              </div>
              <div className="col-md-8">
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                  <Card.Text>
                    <p>Country: {album.country}</p>
                    <p>City: {album.city}</p>
                    <p>Description: {album.description}</p>
                    <p>
                      Created By:{" "}
                      <Link to={`/my-albums/${userId}`}>{album.user.name}</Link>
                    </p>
                    <p>
                      Travel Agency:{" "}
                      <Link to={`/agency`}>{album.agencyused.name}</Link>
                    </p>
                  </Card.Text>
                </Card.Body>
              </div>
            </div>
          </Card>
          <div className="d-flex justify-content-between">
            <Button onClick={deleteProject} variant="danger"> Delete Album </Button>
            <Link to={`/updatealbum/${albumId}`}>
              <Button variant="primary">Update Album</Button>
            </Link>
          </div>
        </>
      )}
    </div>
    </div>
    
  );
}

export default AlbumDetails;
