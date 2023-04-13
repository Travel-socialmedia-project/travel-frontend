import { useState } from "react";
import axios from 'axios';

function AddAlbum(props) {
    const [form, setForm] = useState({
      title: "",
      image: "",
      description: "",
      country: "",
      city: "",
    });
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/albums`, { ...form })
        .then((response) => {
          setForm({
            title: "",
            image: "",
            description: "",
            country: "",
            city: "",
          });
        props.refreshAlbums()
        //
        //   dont know why its not displaying the newly created album on top
        // 
        })
        .catch((error) => console.log("error creating new album", error));
    };
  
  return (
    <section className="AddAlbum">
      <form onSubmit={handleSubmit}> 
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => {
              setForm({...form, title: e.target.value});
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
              setForm({...form, country: e.target.value});
            }}
          />
        </label>

        <label>
          Image:
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={(e) => {
              setForm({...form, image: e.target.value});
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
              setForm({...form, city: e.target.value});
            }}
          />
        </label>
        <label>
          {/* Users:
          <input
            type="text"
            name="userAccess"
            value={form.userAccess}
            onChange={(e) => {
              setForm({...form, userAcess: e.target.value});
            }}
          /> */}
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={(e) => {
              setForm({...form, description: e.target.value});
            }}
          />
        </label>

        <button to='/albums'>Create</button>
      </form>
    </section>
  );
}

export default AddAlbum;
