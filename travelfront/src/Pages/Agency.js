// display form component --> createAgency
// axios get /âgency  remember populate('collection')
// map agencies --> display agency data -->map own albums (makeit a LINK passin Id )

import { useState, useEffect } from "react";
import axios from "axios";
import CreateAgency from "../components/CreateAgency";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function AgencyList() {
  const storedToken = localStorage.getItem("authToken");
  const [agencies, setAgencies] = useState([]);

  const getAllAgency = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/agency`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setAgencies(response.data);
      })
      .catch((e) => console.log("Error Getting agency List", e));
  };

  useEffect(() => {
    getAllAgency();
  }, []);
  return (
    
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h2 className="text-center mb-5">Agencies</h2>
        </div>
      </div>
      <CreateAgency refreshAgency={getAllAgency} />
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {agencies.map((agency) => {
          return (
            <div className="col" key={agency.id}>
              <div className="card h-100 border-0 shadow-sm">
                <img
                
                  src={agency.logo}
                  className="card-img-top, img-fluid mw-100"
                  alt={agency.name} style={{heigth: "200px", width: "175px"}}
                  
                />
                <div className="card-body">
                  <h3 className="card-title">{agency.name}</h3>
                  <p className="card-text">{agency.description}</p>
                  <p className="card-text">
                    Phone Number: {agency.phonenumber}
                  </p>
                  <p className="card-text">Email: {agency.email}</p>
                  <p className="card-text">Website: {agency.website}</p>
                </div>
                <div className="card-footer bg-white border-0">
                <Carousel variant="dark">
  {agency.collections.map((album) => (
    <Carousel.Item key={album._id}>
      <Link to={`/albums/${album._id}`}>
        <img
          className="d-block w-25 mx-auto"
          src={album.image}
          alt={album.title} 
        />
      </Link>
      {/* <Carousel.Caption> */}
      <h3 style={{text: "black"}}>{album.title}</h3>
      {/* </Carousel.Caption> */}
    </Carousel.Item>
    
  ))}
</Carousel>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AgencyList;
