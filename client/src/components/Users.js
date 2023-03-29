import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Users() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function getUser() {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:3000/users`);
      const user = res.data;
      setData(user);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
    getUser();
  },[]);

  const handleCreate = (e) => {
    navigate("/createuser");
  }

  const handleDetail = (userId) => {
    navigate(`/userdetail/${userId}`, {state: userId});
  }

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`http://localhost:3000/users/${userId}`);
      const user = res.data;
      setData(user);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    getUser();
  }

  if (isLoading) {
    return (
        <p>Loading...</p>
    )
  } else {
    return (
        <div className="container">
          <h3>The User List</h3>
          <hr></hr>
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Birthday</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.birthday}</td>
                  <td>
                    <button className="btn btn-success" onClick={()=>handleDetail(user.id)}>Detail</button>
                    <button className="btn btn-danger ms-3" onClick={()=>handleDelete(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={(e)=>handleCreate(e)}>Create</button>
        </div> 
    )
  }
}

export default Users;