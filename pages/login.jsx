import { useState } from 'react';
// @mui
import { Link, Stack, TextField, Checkbox, Button } from '@mui/material';

// components
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { createNotification } from './notification';
import {  useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState([]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,

      [name]: value,
    });
  };

  const validForm = () => {
    const { email, password } = user;
    const formError = {};
    console.log("form validation");
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    let isValue = true;

    if (!email) {
      formError.emailError= "email is required";
      isValue = false;
    } else if (!regEmail.test(email)) {
      formError.emailError = "email pattern wont match";
      isValue = false;
    }
    if (!password || password.length < 4) {
      formError.passwordError = "password is required";
      isValue = false;
    }

    setError(formError);
    return isValue;
  };

  const Login=async(e)=> {
    e.preventDefault();

    const val = validForm();
    console.log(val);

    if (val) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch("http://localhost:4700/login", config);
      const json = await response.json();
      console.log(json, "resdata");

      if (json.auth !== false) {
        localStorage.setItem("token", JSON.stringify(json.token));

        sessionStorage.setItem("loginName", json.results[0].username);

        if (json.results[0].profile === "customer") {
          sessionStorage.setItem("cusname",json.results[0].username)
          sessionStorage.setItem("portemail",json.results[0].email)
          createNotification("success","welcome to customer panel")

          setTimeout(()=>{
            navigate.push('/customer')
          },2000)

        }

        if (json.results[0].profile === "admin") {
          createNotification("success","welcome to admin panel")

          setTimeout(() => {
            navigate.push('/adminpanel');
          }, 1000)
        }

      }
      
      else if (!json.auth) {
        createNotification("warning", json.message);
        console.log("invlid user");
      }
    }
  }


  return (
    <>
    <ToastContainer/>
    <section>
      <br/>
      <br/>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address"
          value={user.email}
          placeholder="Enter your email"
          onChange={handleChange}
        />
          <p style={{ color: "red" }}>{error.emailError}</p>
        <br/>

        <TextField
          name="password"
          label="Password"
          value={user.password}
          placeholder="Enter your password"
          onChange={handleChange}
        
        />
          <p style={{ color: "red" }}>{error.passwordError}</p>
          <br/>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained" onClick={Login}>
        Login
      </Button>
      <br/>
      <br/>
      <Stack>
      <Link variant="subtitle2" underline="hover" onClick={()=>navigate.push('/signup')}>
          Don't have account yet?
        </Link>
      </Stack>
      </section>
    </>
  );
}
