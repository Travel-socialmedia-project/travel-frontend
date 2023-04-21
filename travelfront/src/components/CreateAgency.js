
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../service/service";
import Accordion from 'react-bootstrap/Accordion';

function CreateAgency(props) {
    const [logo, setLogo] = useState([]);
    const storedToken = localStorage.getItem('authToken');
    const [form, setForm] = useState({
      name: "",
      website: "",
      description: "",
      phonenumber: "",
      email:""
    });
  
    const handleFileUpload = async (logoToUpload) => {
      const uploadData = new FormData();
      uploadData.append("logo", logoToUpload);
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/api/upload/logo`,
        uploadData
      );
      return response.data;
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
     
      try {
        const logoUrl = await handleFileUpload(logo);
        
        await api.post("/api/agency", {
          ...form, 
          logo: logoUrl, 
        });
      
        setForm({
          name: "",
          website: "",
          description: "",
          phonenumber: "",
          email:""
        });
      
        setLogo({logo:""});
        props.refreshAgency();
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<Accordion defaultActiveKey="0" >
      <Accordion.Item eventKey="1">
        <Accordion.Header>Create Agency</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleFormSubmit}>
        <Form.Group className="form-group col-md-6">
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
        <Form.Group className="form-group col-md-6">
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
        <Form.Group className="form-group col-md-6">
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
        <Form.Group className="form-group col-md-6">
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
        <Form.Group className="form-group col-md-6">
          <Form.Label>Logo:</Form.Label>
          <Form.Control
            type="file"
            className="form-control-file"
            id="logo"
            name="logo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create the Agency
        </Button>
      </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}

export default CreateAgency;

