import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { service } from "../service/service";

function AddAlbum(props) {
  const { storedToken } = useParams();
  const [image, setImage] = useState("");

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then((response) => {
        setImage(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    country: "",
    city: "",
    userAccess: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    service
      .post(
        `${process.env.REACT_APP_API_URL}/api/albums`,
        { ...form, userAccess: [form.useraccess] },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        console.log(response);
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
      })
      .catch((error) => console.log("error creating new album FE", error));
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
          Image:
          <input
            type="file"
            // name="image"
            onChange={(e) => handleFileUpload(e)}
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

        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default AddAlbum;
