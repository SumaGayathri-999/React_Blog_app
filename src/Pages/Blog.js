import React from 'react'
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import { AiFillDelete} from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import {useState,useEffect} from 'react';
import {toast} from 'react-toastify';
import Badge from '../Components/Badge';



const Blog = () => {
  const[blog,setBlog] = useState([]);
  const {title,description,imageUrl,category} = blog;
  const {id} = useParams();
  useEffect(()=>{
    if(id){
      getSingleBlog(id);
    }
  },[id])
  const getSingleBlog = async ()=>{
    const response = await axios.get(`http://localhost:5000/blogs/${id}`);
    if(response.status === 200){
      setBlog(response.data);
    }
    else{
      toast.info("something went wrong")
    }
  }
  
  return (
    <>
    <div className="container single_blog mt-5">
    <Card className="card" style={{width:"70%"}}>
              <Link to="/" className="go_back"><p style={{color:"grey",fontSize:"18px"}}>Go Back</p></Link>
              <span style={{color:"black",fontSize:"28px"}} className="text-center">{title}</span>
               <Card.Img style={{width:"100%",maxHeight:"600px"}} varient="top" src={imageUrl} alt={title} />
               <Card.Body>
                  <Card.Title className="product_info text-center">{title}</Card.Title>
                  <Card.Subtitle>{description}</Card.Subtitle>
                  <div className="text-center">
                         <Badge style={{fontSize:"20px"}}>{category}</Badge>
            
                  </div>
               </Card.Body>
           </Card>
           </div>
   
    </>
  )
}

export default Blog