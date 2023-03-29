import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
// import * as Yup from 'yup';
import axios from "axios";

function UserDetail() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({});

    // const { errors, values, handleChange, handleSubmit, handleBlur} = useFormik({
    //     initialValues : {
    //         id:'',
    //         name:'',
    //         birthday:''
    //     },
    //     validationSchema: Yup.object().shape({
    //         id: Yup.string().required(),
    //         name: Yup.string().required()
    //     }),
    //     onSubmit: async (values) => {
    //         console.log(JSON.stringify(values));
    //         try {
    //             const updateUser = await axios.put(`http://localhost:3000/users` , values);
    //             console.log('updateUser: ',updateUser)
    //             // if (updateUser.status < 300) {
    //             //     alert(`${JSON.stringify(values)} have been update successfully`);
    //             // } else {
    //             //     console.log(updateUser)
    //             // }
    //         } catch (error) {
    //             console.log(error);
    //         };

    //     }
    // });

    async function checkUserExists (userId) {
        console.log(userId);
        try {
            if (userId) {
                setIsLoading(true);
                const userToCheck = await axios.get(`http://localhost:3000/users/${userId}`)
                const userChecked = userToCheck.data;
                setForm(userChecked);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function updateUser (user) {
        console.log("Đây là user mới:", JSON.stringify(user));
        try {
            const userToUpdate = await axios.put(`http://localhost:3000/users/${user.id}`,user)
            console.log(userToUpdate);
            if (userToUpdate.status<=300) {
                alert("User updated successfully");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        checkUserExists(userId);
    },[userId]);

    const handleChange=(e)=>{
        const newForm =  {...form}
        newForm[e.target.name] = e.target.value;
        setForm(newForm);
        handleValidate();
    };

    const handleValidate = () => {
        let errors = {};
        if (!form.id) {
            form.id = 'Id is required';
        } else if (Number(form.id)<0) {
            errors.id = 'Id must be a positive number';
        } else {
            errors.id = '';
        };

        if (!form.name) {
            errors.name = 'User name is required';
        } else {
            errors.name = '';
        };

        if (!form.birthday) {
            errors.birthday = 'User birthday is required';
        } else {
            errors.birthday = '';
        };

        setErrors(
            errors
        );
    }

    const handleSubmit=()=>{
        updateUser(form);

        navigate("/");

    };

    return (
        <div className='container'>

            <div className="row justify-content-center">
                <div className='col-md-6'>
                    <h2 className='text-center my-4'>User Detail</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="id">Id:</label>
                            <input type="text" className="form-control" id="id" name="id" value={form.id || ""} onChange={(e)=>handleChange(e)} />
                            {errors.id && <p className='error'>{errors.id}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input name="name" type="text" className ="form-control error" value={form.name || ""} onChange={(e)=>handleChange(e)} />
                            {errors.name && <p className='error'>{errors.name}</p>}
                        </div>

                        <div className='form-group'>
                            <label htmlFor="birthday">Birthday</label>
                            <input name="birthday" type="date" className ="form-control error" value={form.birthday || ""} onChange={(e)=>handleChange(e)} />
                            {errors.birthday && <p className='error'>{errors.birthday}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-3" onClick={handleSubmit}>Update</button>
                    </form>
                </div>  
            </div>

            <div className="row justify-content-center">
                <div className='col-md-6'>
                <h2 className='text-center my-4'>New Articles</h2>
                    <form >
                        <div className="form-group">
                            <label htmlFor="id">Article</label>
                            <input type="textarea" className="form-control" id="articles" name="articles" placeholder="Write your article"/>
                            {errors.articles && <p className='error'>{errors.articles}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mt-3" >Add New Article</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default UserDetail;