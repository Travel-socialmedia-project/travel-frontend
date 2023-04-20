// display form component --> createAgency
// axios get /âgency  remember populate('collection')
// map agencies --> display agency data -->map own albums (makeit a LINK passin Id )

import { useState, useEffect } from "react";
import axios from "axios";
import CreateAgency from "../components/CreateAgency";

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
    <div>
      <CreateAgency />

      <div>
        <hr />
        {agencies.map((agency) => {
          
          return (
            <>
              <img src={agency.logo} alt={agency.name} />
              <h1>Agency: {agency.name}</h1>
              <p>Phone Number: {agency.phonenumber}</p>
              <p>Email: {agency.email}</p>
              <p>Website: {agency.website}</p>

              {agency.collections.map((album) => {
                console.log(album);
                return <p>{album.title}</p>;
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AgencyList;
