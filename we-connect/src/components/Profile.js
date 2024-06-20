import React from 'react'
import "./Profile.css";
export default function Profile() {
  return <div className='profile'>
     {/*Profile frame */}
      <div className='profile-frame'>
          {/*Profile Pic */}
        <div className='profile-pic'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s"alt=""/>
        </div>
        {/*Profile-data */}
        <div className='profile-data'>
          <h1>Little Princess</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>40 posts</p>
            <p>40 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>
      <hr style={{
        width: "90%",
        opacity: "0.8",
        margin: "25px auto"
      }}/>
  {/*Gallery*/}
  <div className='gallery'>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2q83JcZgPQfNlAnwAJkBJ-eS9OK7UUzJ5Q&s'alt=''/>
  </div>
    </div>
  
}

