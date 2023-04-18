import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateAlbum() {
    const [form, setForm] = useState({
      title: "",
      image: "",
      description: "",
      country: "",
      city: "",
    });
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
 };


  return (
    <>
    <div>
      <h2>Update Album</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleFormChange}
          />
        </label>
        <br />
<button  type="submit"> Update my Album </button>
      </form>
    </div>


    </>
  )
}
export default UpdateAlbum;
