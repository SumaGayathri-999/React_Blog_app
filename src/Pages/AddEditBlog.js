import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate,useParams} from "react-router-dom";
import {Form,FormControl} from  "react-bootstrap";


// srn3jtom
const initialState={
    title: "",
    description: "",
    category: "",
    imageUrl: ""
}
const options = ["Travel","Fashion","Fitness","sports","Food","Tech"];


const AddEditBlog = () => {
   
   const [formvalue,setFormValue] = useState(initialState);
   const [category_err_msg,setCategory_err_msg] =useState(null);
   const [title_err_msg,setTitle_err_msg] =useState(null);
   const [description_err_msg,setDescription_err_msg] =useState(null);
   const [file_err_msg,setFile_err_msg] =useState(null);
   const [updateMode,setUpdateMode] = useState(false);
   const {title,description,category,imageUrl} = formvalue;
   const navigate =useNavigate();
   const {id} = useParams();

   useEffect(()=>{
     if(id){
        getSingleBlog(id);
        setUpdateMode(true)
     }
     else{
        setFormValue({...initialState});
        setUpdateMode(false);
     }
   },[id])
   const getSingleBlog = async ()=>{
      const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
      if(singleBlog.status === 200){
        setFormValue({...singleBlog.data})
      }
   }
   const getDate = ()=>{
     let today=new Date();
     let dd=String(today.getDate()).padStart(2,"0");
     let mm=String(today.getMonth() + 1).padStart(2,"0");
     let yyyy=today.getFullYear();
     today = dd + "/" + mm + "/" + yyyy;
     return today;
   }
   const handleSubmit = async (e)=>{
    e.preventDefault();
    console.log("hello");
    if(!category){
        setCategory_err_msg("please select a category");
    }
    if(!title){
        setTitle_err_msg("please enter Title");
    }
    if(!description){
        setDescription_err_msg("please enter Description");
    }
    if(!imageUrl){
        setFile_err_msg("please upload a file");
    }
    if(title && description && imageUrl && category){
        const currentdate = getDate();
        if(!updateMode){
            const updateBlogData = {...formvalue,date : currentdate};
            const response = await axios.post("http://localhost:5000/blogs",updateBlogData);
            if(response.status === 201){
                toast.success("Blog Created Succcessfully");
            }
            else{
                toast.error("something went wrong");
            }
        }
        else{
            const response = await axios.put(`http://localhost:5000/blogs/${id}`,formvalue);
            if(response.status === 200){
                toast.success("Blog Updated Succcessfully");
            }
            else{
                toast.error("something went wrong");
            }
        }
        
        setFormValue({title:"",description:"",category:"",imageUrl:""});
    }
   }
   const onTitleChange = (e)=> {
    setTitle_err_msg(null);
     setFormValue({...formvalue,title:e.target.value})

   }
   const onDescriptionChange = (e)=> {
    setDescription_err_msg(null);
    setFormValue({...formvalue,description:e.target.value})

  }
   const onCategoryChange =(e) =>{
    setCategory_err_msg(null);
    setFormValue({...formvalue,category:e.target.value})
   }
   const onUploadImage = (file) => {
   const formData = new FormData();
    formData.append("file",file);  //key value pair
    formData.append("upload_preset","srn3jtom");
    axios.post("http://api.cloudinary.com/v1_1/dpg5uol9a/image/upload",formData)
    .then((res)=>{
        toast.info("Image uploaded successfully");
        setFormValue({...formvalue,imageUrl:res.data.url})
        setFile_err_msg(null);
    })
   
    .catch((err)=>{
        toast.info("something went wrong")
    })
}
  return (
    <form className="form" style={{marginTop:"50px"}}>
       <div className='input_container'>
          <div className="title_container mb-2"> <h2 className="text-center title">{updateMode ? "UPDATE BLOG" :"ADD BLOG"}</h2></div>
           {title_err_msg && (<div className="error_msg">{title_err_msg}</div>)}
           <FormControl className="input_field" name="title" value={title || ""} type="text" onChange={onTitleChange} required validation="please provide a title" placeholder="Title" invalid></FormControl>
           <br/>
           {description_err_msg && (<div className="error_msg">{category_err_msg}</div>)}
           <Form.Control as="textarea" name="description" value={description || ""}  rows="5" onChange={onDescriptionChange} required validation="please provide a description" placeholder="Description" invalid></Form.Control>
           <br/>
           {!updateMode && (
            <>
                 {file_err_msg && (<div className="error_msg">{file_err_msg}</div>)}
                 <Form.Control type="file" rows="5" onChange={(e)=>onUploadImage(e.target.files[0])} required validation="please uploade a image" invalid></Form.Control>
                 <br/>
            </>
            
           )
           }
          
           {category_err_msg && (<div className="error_msg">{category_err_msg}</div>)}
           <Form.Select className='categoryropdown' onChange={onCategoryChange} value={category}>
              <option value="null">Select category</option>
              {options.map((option,index)=>(
                <option key="index" value={option || ""}>{option}</option>
              ))}
           </Form.Select>
           <br/><br/>
           <div className="button_div">
               <button  className="btn btn-dark p-2 " onClick={()=>{navigate("/")}}>Go Back</button>
               <button type="submit" className="btn btn-primary p-2" onClick={handleSubmit}>{updateMode ? "UPDATE" :"ADD"}</button>
           </div>
       </div>
    </form>
  )
}

export default AddEditBlog