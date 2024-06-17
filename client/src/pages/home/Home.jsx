import Header from "../../components/header/Header"
import "./home.css"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"
import { useEffect } from "react";
import { useState} from "react";
import axios from 'axios';

import { useLocation } from 'react-router-dom';


export default function Home() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();


  // useEffect is used to fetch all posts ,first when the component is mounted
  useEffect(()=>{
    const fetchPosts = async ()=>{
      // a async function this makes a get request to get all posts and saves them in array in res
      const res = await axios.get("/posts" + (search ? search : ''));
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
      // this is state change of posts using setPost function;
      setPosts(res.data)
    }
    fetchPosts()
  },[search])
  
  return (
    <>
      {/* <Header /> */}
      <div className="home"> 
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </>
  )
}
