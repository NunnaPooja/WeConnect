import React,{useState,useEffect } from 'react';
import "./Createpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Createpost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const navigate =useNavigate()


    //Toast Functions
const notifyA =(msg)=> toast.error(msg)
const notifyB =(msg)=> toast.success(msg)
useEffect(()=>{

  //saving post to mongodb
  if(url){
    fetch("http://localhost:5000/createPost",{
      method:"post",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer"+localStorage.getItem("jwt")
      
      },
      body:JSON.stringify({
        body,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error)
      }else{
        notifyB("Succesfully Posted")
        navigate("/")
      }
    })
    .catch(err=> console.log(err))
  }
},[url])

//posting image to cloudinary
const postDetails=()=>{
  console.log(body,image)
  const data = new FormData()
  data.append("file",image)
  data.append("upload_preset","we-connect")
  data.append("cloud_name","Pooja05")
  fetch("https://api.cloudinary.com/v1_1/Pooja05/image/upload",
    {
      method: "post",
      body:data
    }
  ).then(res=> res.json())
  .then(data=> setUrl(data.url))
  .catch(err=> console.log(err))
console.log(url)
}


    const loadfile =(event)=>{
        var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    };
    };
  return (
 
    <div className='createPost'>
         {/* header*/}
   <div className='post-header'>
    <h4 style={{margin:"3px auto"}}>Create New Post</h4>
    <button id="post-btn" onClick={()=>{postDetails()}}>Share</button>
   </div>
   {/*image preview*/}
   <div className='main-div'>
    <img id="output" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIwiKbRMRJkaJBTn7kU1Atnt_Qd6exNbacQ&s'/>
    <input type='file' accept='image/*' onChange={(event)=>{loadfile(event);setImage(event.target.files[0])}}/>
    </div>
 {/*details*/}
 <div className='details'>
    <div className='card-header'>
    <div className='card-pic'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
        </div>
        <h5>Pooja</h5>
    </div>
    <textarea value={body} onChange={(e) =>{setBody(e.target.value)}}type="text"placeholder="Write a Caption..."></textarea>
 </div>
    </div>
  )
}