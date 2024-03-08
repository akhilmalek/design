import React, {useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// import posts from "../blog-post.json";


export default function BlogPost() {

  const [users, setUsers] = useState([]);

      const fetchData = () => {
        axios.get("https://jsonplaceholder.typicode.com/users/").then((response) => {
            setUsers(response.data);
        });
      };

      useEffect(() => {
        fetchData();
      }, []);

  const router = useRouter();
  const {id} = router.query;
  console.log(id, "log 1");


  const getUserById = (userID) => {
    const parsedUserId = parseInt(userID);
    return users.find(user => user.id === parsedUserId);
  };


let found = getUserById(id);
     
  return (
    
    <div style={{paddingTop: "100px"}}>
 
    <div className="container">
      <p>{found?.username}</p>
      <p>{found?.website}</p>
      <p>{found?.email}</p>
      <p>{found?.address.street}</p>
      <p>{found?.phone}</p>
      <p>{found?.company.name}</p>
    </div>

      <div className="container">

        {/* <iframe style={{width: "100%", height: "500px"}} title="Toggle Hide and Show" src="https://codepen.io/webdev-gmail/embed/yLQVNwx?default-tab=result&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
          See the Pen <a href="https://codepen.io/webdev-gmail/pen/yLQVNwx">
          Toggle Hide and Show</a> by webdev (<a href="https://codepen.io/webdev-gmail">@webdev-gmail</a>)
          on <a href="https://codepen.io">CodePen</a>.
        </iframe> */}

      </div>    
    </div>
  );
}
