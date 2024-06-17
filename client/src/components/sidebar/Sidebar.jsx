import "./sidebar.css";
import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useState} from "react";
import axios from 'axios';


export default function Sidebar() {
    const [cat,setCats] = useState([]);

    useEffect(()=>{
      const getCats = async () =>{
        const res = await axios.get("/category")
        setCats(res.data)
      } 
      getCats();
    },[]);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        {/* <img className="sidebarImg" src="logo.png" alt=" " /> */}
        <span className="title">ByteBitesBlog</span>
        <p>
        Welcome to Blog Bites Blog, your go-to source for the latest in the world of technology. We're on a mission to simplify complex tech topics and keep you informed about the most exciting developments. Our team of tech enthusiasts is dedicated to delivering tech news, product reviews, how-tos, and insights to help you navigate the digital landscape. Join us on this tech journey, and together, we'll explore the future of innovation
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarItem">CATEGORIES</span>
        <ul className="sidebarList">
            {cat.map((c)=>(
              <Link to={`/?cat=${c.name}`} className="link">
                <li className="sidebarListItem">{c.name}</li>
              </Link>  
            ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <a target="_blank" href=""><i className="sidebarIcon fa-brands fa-square-facebook"></i></a>
          <a target="_blank" href=""><i className="sidebarIcon fa-brands fa-square-x-twitter"></i></a>
          <a target="_blank" href=""><i className="sidebarIcon fa-brands fa-pinterest"></i></a>
          <a target="_blank" href=""><i className="sidebarIcon fa-brands fa-square-instagram"></i></a>
          
        </div>
      </div>
    </div>
  );
}
