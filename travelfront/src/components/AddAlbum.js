import { useEffect, useState } from "react";
import axios from "axios";

import api from "../service/service";
// import service from "../service/service";
import { Accordion, Button } from "react-bootstrap";
import {} from "react-bootstrap/Button";

function AddAlbum(props) {
  const storedToken = localStorage.getItem("authToken");
  const [agencies, setAgency] = useState([]);
  const [image, setImage] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    userAccess: "",
    agencyused: "",
  });

  useEffect(() => {
    const getAgency = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/agency`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      setAgency(response.data);
    };
    getAgency();
  }, []);

  const handleFileUpload = async (imageToUpload) => {
    const uploadData = new FormData();

    uploadData.append("image", imageToUpload);

    const response = await api.post(
      `${process.env.REACT_APP_API_URL}/api/upload`,
      uploadData
    );

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("FORM BODY",form )
    const imageUrl = await handleFileUpload(image);
    await api.post("/api/albums", {
      ...form,
      image: imageUrl,
      userAccess: [form.useraccess],
    });

    setForm({
      title: "",
      description: "",
      country: "",
      city: "",
      userAccess: "",
      agencyused:  ""
    });
    setImage({
      image: "",
    });
    props.refreshAlbums();
  };

  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="1">
        <Accordion.Header>Add an Album</Accordion.Header>
        <Accordion.Body>
          <section className="AddAlbum">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className="form-group col-md-6">
                    <label htmlFor="title">Title:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={(e) => {
                    setForm({ ...form, country: e.target.value });
                  }}
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={(e) => {
                      setForm({ ...form, city: e.target.value });
                    }}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                    }}
                  />
                </div>
                {/*  */}

                <div className="form-group col-md-6">
                  <label htmlFor="agencyused">Choose Agency:</label>
                  <select
                    className="form-control"
                    id="agencyused"
                    name="agencyused"
                    
                    onChange={(e) => {
                      setForm({ ...form, agencyused: e.target.value });
                    }}
                  >
                    {agencies.map((agency) => (
                      <option key={agency._id} value={agency._id}>
                        {agency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Button variant="primary" type="submit">
                  Create
                </Button>
              </div>
            </form>
          </section>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AddAlbum;
