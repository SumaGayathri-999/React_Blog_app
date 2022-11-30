import React from 'react'
import {Card} from 'react-bootstrap';
import { AiFillDelete} from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Badge from './Badge';



const Blogs = ({title,description,imageUrl,category,id,excerpt,handleDelete}) => {
  return (
    
           <Card className="card" style={{width:"20%",marginLeft:"2%"}}>
               <Card.Img className="card_img" varient="top" src={imageUrl} alt={title} />
               <Card.Body>
                  <Card.Title className="product_info text-center">{title}</Card.Title>
                  <Card.Subtitle>{excerpt(description)}</Card.Subtitle>
                  <div className="text-center">
                        <Link to={`/blog/${id}`} ><span style={{color:"blue"}}>Read More</span></Link>
                         <Badge style={{fontSize:"20px"}}>{category}</Badge>
                         <span>
                            <AiFillDelete className="delete_icon text-center" onClick={()=>handleDelete(id)} style={{color:"red"}} />
                        </span>
                       <Link to={`editblog/${id}`}>
                          <FaEdit className="delete_icon text-center" style={{color:"#0589bd"}} />
                        </Link>
                  </div>
               </Card.Body>
           </Card>
   
  )
}

export default Blogs;