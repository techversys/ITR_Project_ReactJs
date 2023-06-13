import { useEffect, useState } from 'react';
// @mui
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Stack, TextField, FormControl, FormLabel, Select, MenuItem, Button } from '@mui/material';
// components

import { useFormik } from "formik";
import { createNotification } from './notification.js';
import { RegisterSchema } from './Schemas/RegisterSchema';

// ----------------------------------------------------------------------

export default function SignUp() {

  const [profileImg, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialValues = {
    username: "",
    phoneno: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: "",
    address: "",
    dob: "",
  };
  
  const {
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik(
    {
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: async (values, action) => {
      console.log(action,'getvalues');

      console.log(
        "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
        values
      );

      try {
        const config = {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const signupResponse = await Axios.post(
          "http://localhost:4700/register",
          values,
          config
        );

        console.log(signupResponse, "signupResponse");
        if (signupResponse.data.statusCode === 401) {
          createNotification("warning", signupResponse.data.message);
        } else if (signupResponse.data.statusCode === 201) {
          createNotification("success", signupResponse.data.message);
          Navigate('/login');
        }
      } catch (err) {
        createNotification("error", err.response);
      }
      action.resetForm();
    },
  });


  return (
    <>
      <ToastContainer />
      <br/>
      <br/>
      <div>
        <form autoComplete="off" onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <FormControl>
            <FormLabel component="legend" >User Name</FormLabel>

              <TextField
                placeholder="Enter Your User Name"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <p style={{ color: "red" }}>{errors.username}</p>
              ) : null}
              <br />
            </FormControl>

            <FormControl>
            <FormLabel component="legend" >Password</FormLabel>
              <TextField
                // label="Password"
                placeholder="Provide Enter Your Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
             
              />
              {errors.password && touched.password ? (
                <p style={{ color: "red" }}>{errors.password}</p>
              ) : null}
              <br />
            </FormControl>

            <FormControl>
            <FormLabel component="legend" >Confirm Password</FormLabel>

              <TextField
                placeholder="Enter Your Matching Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
               
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              ) : null}
              <br />
            </FormControl>

 
            <FormControl>
            <FormLabel component="legend" >Email Address</FormLabel>

              <TextField
                name="email"
                placeholder="Enter Your Email Address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p style={{ color: "red" }}>{errors.email}</p>
              ) : null}
            </FormControl>
            <br />

            <FormControl>
            <FormLabel component="legend" >Profile</FormLabel>
              <Select
                name="profile"
                value={values.profile}
                onChange={handleChange}
                onBlur={handleBlur}

              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="customer">Customer</MenuItem>
              </Select>
              {errors.profile && touched.profile ? (
                <p style={{ color: "red" }}>{errors.profile}</p>
              ) : null}
            </FormControl>
            <br />
            
            <FormControl>
            <FormLabel component="legend" >Gender</FormLabel>
              <Select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}

              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>

              </Select>
              {errors.gender && touched.gender ? (
                <p style={{ color: "red" }}>{errors.gender}</p>
              ) : null}
            </FormControl>
            <br /> 

          <FormControl>
            <FormLabel component="legend" >Date of Birth</FormLabel>
              <TextField
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dob && touched.dob ? (
                <p style={{ color: "red" }}>{errors.dob}</p>
              ) : null}
            </FormControl>
            <br />

          <FormControl>
            <FormLabel component="legend" >Address</FormLabel>
              <TextField
                id="standard-multiline-static"
                placeholder="Enter Your Address"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={4}
                variant="standard"
              />
              {errors.address && touched.address ? (
                <p style={{ color: "red" }}>{errors.address}</p>
              ) : null}
          </FormControl>
            <br />


            <FormControl>
            <FormLabel component="legend" >Contact Number</FormLabel>

              <TextField
                type="number"
                placeholder="Enter Your Contact Number"
                name="phoneno"
                value={values.phoneno}
                onChange={handleChange}
                onBlur={handleBlur}
                min="0" max="20"
              />
              {errors.phoneno && touched.phoneno ? (
                <p style={{ color: "red" }}>{errors.phoneno}</p>
              ) : null}
            </FormControl>
            <br />

            <FormControl>
            <FormLabel component="legend" >Profile Image</FormLabel>

              <TextField
                name="file"
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.target.files[0]);
                  setImage(
                    URL.createObjectURL(event.target.files[0])
                  );
                }}
              />

            </FormControl>
          </Stack>
          <br/>
          <br/>

          <Button fullWidth size="large" type="submit" variant="contained" >
            SignUp
          </Button>
        </form>
      </div>
    </>
  );
}

