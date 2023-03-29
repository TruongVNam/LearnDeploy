import React, {useState} from 'react';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import axios from 'axios';

// async function getUser(userId) {
//     try {
//       const res = await axios.get(`http://localhost:3000/users?${userId}`);
//       console.log(res);
//     } catch (error) {
//       console.error(error);
//     }
// }

// async function addUser(values) {
//     try {
//         const res = await axios.post(`http://localhost:3000/users` , values);
//         console.log(newUser);
//     } catch (error) {
//         console.log(error);
//     }
// }




const CreateUser =()=>{

    const { errors, values, handleChange, handleSubmit, handleBlur} = useFormik({
        initialValues : {
            id:'',
            name:'',
            birthday:''
        },
        validationSchema: Yup.object().shape({
            id: Yup.string().required("Id is required"),
            name: Yup.string().required("Name is required"),
            birthday: Yup.string().required("Birthday is required")
        }),
        onSubmit: async (values) => {
            console.log(values);
            try {
                const resGetUser = await axios.get(`http://localhost:3000/users?${values.id}`);
                const isUserExist = resGetUser.data
                if (isUserExist.id) {
                    alert(`${values.id} already exists`);
                } else {
                    const resPostUser = await axios.post(`http://localhost:3000/users` , values);
                    if (resPostUser.status < 300) {
                        console.log(resPostUser)
                        alert(`${JSON.stringify(values)} have been add successfully`);
                    } else {
                        console.log(resPostUser)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className='col-md-6'>
                <h2 className='text-center my-4'>Add New User</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input type="text" className="form-control" id="id" name="id" onChange={handleChange} onBlur={handleBlur}/>
                            {errors.id && <p className='error'>{errors.id}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input name="name" type="text" className ="form-control error" onChange={handleChange} onBlur={handleBlur}/>
                            {errors.name && <p className='error'>{errors.name}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor="birthday">Birthday</label>
                            <input name="birthday" type="date" className ="form-control error"  onChange={handleChange} onBlur={handleBlur}/>
                            {errors.birthday && <p className='error'>{errors.birthday}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CreateUser;