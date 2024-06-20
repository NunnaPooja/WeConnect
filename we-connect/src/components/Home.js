import React,{useEffect,useState} from 'react';
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
const navigate=useNavigate();
const[data,setData]=useState([])
  useEffect(()=>{
    const token= localStorage.getItem("jwt")
    if(!token){
navigate("./signup")
    }
    //fetching all posts
    fetch("htt://localhost::5000/allposts",{headers:{
      "Authorization": "Bearer"+localStorage.getItem("jwt")
    },
      
    }).then(res=>res.json())
    .then(result=> setData(result))
    .catch(err=>console.log(err))
  },[])
  return (
  <div className='home'>
    {/* card */}
    {data.map((posts)=>{
    return(<div className="card">
      {/*card header*/}
      <div className='card-header'>
      <div className='card-pic'>
      <img src={posts.photo}alt=''/>
        </div>
        <h5>{posts.postedBy.name}</h5>
      </div>
      {/*card image*/}
<div className= "card-image">
<img src={posts.pic}alt=''/>
 </div>
{/*card content */}
<div className="card-content">
 <span className="material-symbols-outlined">favorite</span>
 <p>1 Like</p>
 <p>{posts.body}</p>
 </div>
 <div className="add-comment">
 <span className="material-symbols-outlined">mood</span>
 <input type='text' placeholder='Add a Comment'/>
 <button className='comment'>Post</button>
 </div>
      </div>
)
    })}
    
      </div>
     
  )
}
