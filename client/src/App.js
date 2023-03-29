import './App.css';
import React, { useEffect, useState } from "react";
import {createBrowserRouter, RouterProvider, Router, createHashRouter } from "react-router-dom";
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import CreateUser from './components/CreateUser';


const router = createHashRouter([
  { path:"/", element: <Users/>},
  { path:"/createuser", element: <CreateUser/>},
  // { 
  //   path:"/userdetail", 
  //   element: <UserDetail/>,
  // },
  { 
    path:"/userdetail/:userId", 
    element: <UserDetail/>,
  },
]);

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
