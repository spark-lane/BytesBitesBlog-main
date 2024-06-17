import { useContext, useEffect } from "react";
import {Link} from "react-router-dom";
import "./singlePost.css";
import { useState} from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Context } from "../../context/Context";


export default function SinglePost() {
  const {user} = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  // here {} becoz post is a obj
  const [post,setPost] = useState({});
  const [title,setTitle] = useState("");
  const [desc,setDesc] = useState("");
  const [updateMode,setUpdateMode] = useState(false);
 

  useEffect(()=>{
    const getPost = async () =>{
      // path var is the id for the post we take out from the location
      const res = await axios.get("/posts/"+path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  },[path]);

  const handleDelete = async() =>{
    try{
      await axios.delete(`/posts/${post._id}`,{
        data : {username : user.username},
      });
      window.location.replace("/");
    } catch (err){}
  };

  const handleUpdate = async() =>{
    try{
      await axios.put(`/posts/${post._id}`,{
        username : user.username,
        title,
        desc,
      });
      setPost({
        ...post,
        title,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF +  post.photo} alt="" className="singlePostImg" />
        )}
        {/* check if updateMode is true using ternary */}
        {/* Updating the Title */}
        {updateMode ? (
          <input 
              type ="text"
              value = {title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e)=> setTitle(e.target.value)}
              style={{backgroundColor:'black',color:'white',textdecoration:'none'}}
          />
        ):(
          <h1 className="singlePostTitle">
          {post.title}
          {
            post.username === user?.username && (
              <div className="singlePostEdit">
              <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=> setUpdateMode(true)}></i>
              <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
            </div>
            )
          }
        </h1>
        )}

         {/* No need to Update author and date of creation */}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author :
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">{new Date (post.createdAt).toDateString()}</span>
        </div>

         {/* Updating the desc info  */}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value = {desc}
            onChange={(e)=> setDesc(e.target.value)}
            style={{backgroundColor:'black',color:'white'}}
          />
        ) : (
            <p className="singlePostDesc">{desc}</p>
        )}

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>Update</button>
        )}
      </div>
    </div>
  );
}
