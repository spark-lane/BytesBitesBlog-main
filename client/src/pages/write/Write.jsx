import { useContext, useState } from "react";
import "./write.css";
import axios from "axios"; // for making HTTP requests to the server
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";


export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // Prevents page from reloading
    e.preventDefault();
    // Created a new obj of post ,with the current username
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    //Checks if a file(img) has been uploaded,if done then code will execute
    if (file) {
      const data =new FormData();
      //Generate a unique file name for img using current timestamp and og name
      const filename = Date.now() + file.name;
      // add the genrated data to from 
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        //The upload is handled by multer which saved the img on local storage
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      //a request is send to api with post and id is return and the post is rendered
      const res = await axios.post("/posts", newPost);
      navigate("/posts/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus" title="Upload a Image"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish <i class="fa-solid fa-upload"></i>
        </button>
      </form>
    </div>
  );
}
