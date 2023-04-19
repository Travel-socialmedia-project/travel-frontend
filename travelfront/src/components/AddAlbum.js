import { useState } from "react";
import axios from "axios";

import api from "../service/service";
// import service from "../service/service";
import { Accordion, Button } from "react-bootstrap";
import {} from "react-bootstrap/Button";

function AddAlbum(props) {
  
  const [image, setImage] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    userAccess: "",
  });

  const handleFileUpload = async (imageToUpload) => {
    const uploadData = new FormData();

    uploadData.append("image", imageToUpload);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/upload`,
      uploadData
    );

    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
              <div>
            <label>
                Image:
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
              </div>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                  }}
                />
              </label>

              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={(e) => {
                    setForm({ ...form, country: e.target.value });
                  }}
                />
              </label>

              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={(e) => {
                    setForm({ ...form, city: e.target.value });
                  }}
                />
              </label>

              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={(e) => {
                    setForm({ ...form, description: e.target.value });
                  }}
                />
              </label>

              <label>
                Add User Access:
                <input
                  type="text"
                  name="useraccess"
                  value={form.useraccess}
                  onChange={(e) => {
                    setForm({ ...form, useraccess: e.target.value });
                  }}
                />
              </label>
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
