import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap';

function UpdateAlbum() {
    const [form, setForm] = useState({
      title: "",
      description: "",
      country: "",
      city: "",
    });
    const [image, setImage] = useState("");
    const { albumId } = useParams();
    const navigate = useNavigate();
    const storedToken = localStorage.getItem('authToken');
  useEffect(() => {
   axios
     .get(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`,{ headers: { Authorization: `Bearer ${storedToken}`} })
     .then((response) => {
       const oneAlbum = response.data;
       setForm({
         title: oneAlbum.title,
         image: oneAlbum.image,
         description: oneAlbum.description,
         country: oneAlbum.country,
         city: oneAlbum.city,
       });
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
 const handleFormSubmit = (e) => {
   e.preventDefault();

   const requestBody = {
     title: form.title,
     image: form.image,
     description: form.description,
     country: form.country,
     city: form.city,
   };

   axios
     .put(`${process.env.REACT_APP_API_URL}/api/albums/${albumId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}`} })
     .then((response) => {
       navigate(`/albums/${albumId}`);
     })
     .catch((error) => console.log("error updating this Album", error));
 }


  return (
    //   <>
    //     <div>
    //       <h2>Update Album</h2>
    //       <form onSubmit={handleFormSubmit}>
    //         <div className="form-group">
    //           <label htmlFor="title">Title:</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="title"
    //             name="title"
    //             value={form.title}
    //             onChange={handleFormChange}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="image">Image:</label>
    //           <input
    //             type="file"
    //             className="form-control-file"
    //             id="image"
    //             name="image"
    //             onChange={(e) => setImage(e.target.files[0])}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="description">Description:</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="description"
    //             name="description"
    //             value={form.description}
    //             onChange={handleFormChange}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="country">Country:</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="country"
    //             name="country"
    //             value={form.country}
    //             onChange={handleFormChange}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="city">City:</label>
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="city"
    //             name="city"
    //             value={form.city}
    //             onChange={handleFormChange}
    //           />
    //         </div>
    //         <Button variant="primary" type="submit">
    //           Update my Album
    //         </Button>
    //       </form>
    //     </div>
    //   </>




// 

<div>
 <h2>Update Album</h2>
<form onSubmit={handleFormSubmit}>
  <div class="form-row">
  <div class="form-group">
    <label for="image">Image:</label>
    <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
    <div class="form-group col-md-6">
      <label for="title">Title:</label>
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
  <div class="form-group col-md-6">
    <label for="description">Description</label>
    <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="city">City</label>
      <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={form.city}
                onChange={handleFormChange}
              />
    </div>
    <div class="form-group col-md-6">
      <label for="country">Country:</label>
      <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={form.country}
                onChange={handleFormChange}
              />
    </div>
    <div class="form-group col-md-6">
      <label for="agency">Agency</label>
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


     );


}
export default UpdateAlbum;



/*

*/