import React from 'react'
import {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import Blogs from '../Components/Blogs';

const Home = () => {
  const [data,setData]=useState([]);
  useEffect(()=>{
     loadBlogData();
  },[])
  const loadBlogData = async ()=>{
     const response = await axios.get("http://localhost:5000/blogs");
     if(response.status === 200){
      setData(response.data);
     }
     else{
      toast.info("something went wrong")
     }
  }
  console.log(data);
  const handleDelete = async (id)=>{
     if(window.confirm("Are you sure to delete this Blog")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if(response.status === 200){
        toast.success("Blog deleted successfully");
        loadBlogData();
      }
      else{
       toast.error("something went wrong")
      }
     }
  }
  const excerpt = (str)=>{
    if(str.length>50){
      str = str.substring(0,50) + "..."
  }
  return str;
  }
  return (
    <div>
          {data.length === 0 && (<h4>No Blogs Found</h4>)}
          <div className="blogs_container p-5">
            {data && data.map((item,index)=><Blogs  key={index} {...item} excerpt={excerpt} handleDelete={handleDelete}/>)}
          </div>
    </div>
    
  )
}

export default Home