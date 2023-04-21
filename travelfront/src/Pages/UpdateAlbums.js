import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';
import api from "../service/service";

function UpdateAlbum() {
  const [image, setImage] = useState("");
    const [form, setForm] = useState({
      title: "",
      description: "",
      country: "",
      city: "",

    });
    const { albumId } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');


    const handleFileUpload = async (imageToUpload) => {
      const uploadData = new FormData();
  
      uploadData.append("image", imageToUpload);
  
      const response = await api.post(
        `${process.env.REACT_APP_API_URL}/api/upload`,
        uploadData
      );
  
      return response.data;
    };


  useEffect(() => {
   axios
     .get(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`,{ headers: { Authorization: `Bearer ${storedToken}`} })
     .then((response) => {
       const oneAlbum = response.data;
       setForm({
         title: oneAlbum.title,
         
         description: oneAlbum.description,
         country: oneAlbum.country,
         city: oneAlbum.city,
       });
       setImage({image:oneAlbum.image})
     })
     .catch((error) => console.log("error getting this Album", error));
 }, [albumId]);///add [albumId]

 // Update the form state when the user types in an input field
 const handleFormChange = (e) => {
   const { name, value } = e.target;
   setForm((prevForm) => ({
     ...prevForm,
     [name]: value,
   }));
 };

 // Submit the form data to update the album
 const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const imageUrl = await handleFileUpload(image);
    const requestBody = {
      image: imageUrl.imageUrl, 
      title: form.title,
      description: form.description,
      country: form.country,
      city: form.city,
    };

    await api.put(`/api/albums/${albumId}`, requestBody);
    navigate(`/albums/${albumId}`);
  } catch (error) {
    console.log("error updating this Album", error);
  }
};


return (
  <div style={{paddingTop: "80px" , display: 'flex', justifyContent: 'center' }}>
    <div>
      <h2>Update Album</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-row mb-3">
          <div className="form-group col-md-12">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="form-group col-md-12 mb-3">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={form.title}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group col-md-12 mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={form.description}
            onChange={handleFormChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-12 mb-3">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={form.city}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group col-md-12 mb-3">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              className="form-control"
              id="country"
              name="country"
              value={form.country}
              onChange={handleFormChange}
            />
          </div>
          <div className="form-group col-md-12 mb-3">
            <label htmlFor="agency">Agency</label>
            <input
              type="text"
              className="form-control"
              id="agency"
              name="agency"
              value={form.agency}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div>
          <Button variant="primary" type="submit">
            Update my Album
          </Button>
        </div>
      </form>
    </div>
  </div>
);

}
export default UpdateAlbum;

/*

*/