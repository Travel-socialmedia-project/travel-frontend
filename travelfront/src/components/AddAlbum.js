import { useState,  } from "react";
import axios from 'axios';

function AddAlbum(props) {

  const storedToken = localStorage.getItem('authToken');

  // const {userId} = useParams();
    const [form, setForm] = useState({
      title: "",
      image: "",
      description: "",
      country: "",
      city: "",
      // user: props.user._id
    });
  
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/albums`, { ...form },{ headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
          setForm({
            title: "",
            image: "",
            description: "",
            country: "",
            city: "",
            // user: props.user._id
            
          });
          
        props.refreshAlbums()
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
        {/* <label>
          Created By:
          <input
            type="hidden"
            name="user"
            value={form.user}
            onChange={(e) => {
              setForm({...form, user: e.target.value});
            }}
          />
        </label> */}
        {/* <p>Posted by: {props.user.name}</p> */}
        <button to='/albums'>Create</button>
      </form>
    </section>
  );
}

export default AddAlbum;
  // {/* Users:
  //         <input
  //           type="text"
  //           name="userAccess"
  //           value={form.userAccess}
  //           onChange={(e) => {
  //             setForm({...form, userAcess: e.target.value});
  //           }}
  //         /> */}