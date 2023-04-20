// form 
// axios post /âgency

import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function CreateAgency(props) {
  const [logo, setLogo] = useState(null);
  const storedToken = localStorage.getItem('authToken');
  const [form, setForm] = useState({
    name: "",
    website: "",
    description: "",
    phonenumber: "",
    email:""
  });

  const handleFileUpload = async (imageToUpload) => {
    const uploadData = new FormData();
    uploadData.append("logo", imageToUpload);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/agency`,
      uploadData
    );
    return response.data;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let logoUrl = "";
    if (logo) {
      logoUrl = await handleFileUpload(logo);
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/api/agency`, {
      ...form, 
      logo: logoUrl, 
    }, { headers: { Authorization: `Bearer ${storedToken}` } }
    );
    setForm({
      name: "",
      website: "",
      description: "",
      phonenumber: "",
      email:""
    });
    setLogo(null);
    // props.refreshAgency();
  };

  return (
    <div>
      <h2>Create Agency</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="website">
          <Form.Label>Website:</Form.Label>
          <Form.Control
            type="url"
            name="website"
            value={form.website}
            onChange={(e) => {
              setForm({ ...form, website: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="phonenumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="number"
            name="phonenumber"
            value={form.phonenumber}
            onChange={(e) => {
              setForm({ ...form, phonenumber: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group controlId="logo">
          <Form.Label>Logo:</Form.Label>
          <Form.Control
            type="file"
            name="logo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create the Agency
        </Button>
      </Form>
    </div>
  );
}

export default CreateAgency;