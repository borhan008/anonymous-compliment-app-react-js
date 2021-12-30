import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { UserAuth } from './userContext/userContext';
import { db } from '../firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';
import {Link} from 'react-router-dom';
function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    const {currentUser, SignUp} = UserAuth();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(() => {
        document.title = "AnoMSG | Registration";
    }, [])    
    const userHandler = async(e) => {
        e.preventDefault();
        setButtonClick(true);

        const q = query(collection(db, "users"), where("username", "==", username ));
        const querySnapshot = await getDocs(q);
        let count = 0;
        querySnapshot.forEach(async (doc) => {    
            count += 1;
        });  


       if(!username){
        setUsernameError("Username is required.");
       }
       else if(username && username.length < 4){
        setUsernameError("Username should be greater than 3.");
      } 
      else if(count > 0){
        setUsernameError("Username is already exists.");
      }
  
      else if(!email){
        setUsernameError('');
        setEmailError("Email is required.");
      }
     else if(email && reg.test(email) === false){
        setUsernameError('');
        setEmailError("Email is not valid.");          
      }    
     else if(!password){
        setUsernameError('');
        setEmailError("");    
        setPasswordError("Password id required.");

    }   
    else if(password && password.length < 6){
        setUsernameError('');
        setEmailError("");    
        setPasswordError("Password should be greater than 5.");        
    }     
    else{
        setUsernameError('');
        setEmailError("");    
        setPasswordError("");   
        try{
            await SignUp(email, password, username);
            window.location.reload();

        }catch(err){
            setEmailError("Email is already existed.");   
        } 

    }    
    setButtonClick(false);
    }
    return (
        <div>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ maxWidth: 300 }} 
              style={{ margin: '10px auto' }}
            >
            <form
                onSubmit = {userHandler}
            >
                <TextField
                    helperText={usernameError ? usernameError : ''}
                    id="username"
                    label="Username"
                    style={{ width : '100%' , margin : '5px 0px'}}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={usernameError ? 'true' : ''}
                   
                />
                <TextField
                    helperText={emailError ? emailError : ''}
                    id="email"
                    label="Email"
                    style={{ width : '100%' , margin : '5px 0px'}}
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    error={emailError ? 'true' : ''}
                />   
                <TextField
                    helperText={passwordError ? passwordError : ''}
                    id="password"
                    label="Password"
                    style={{ width : '100%' , margin : '5px 0px'}}
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    error={passwordError ? 'true' : ''}
                />      
                <Button disabled={buttonClick ? true : false} variant="contained" style={{ width : '100%' }} type="submit" >
                    { buttonClick ? 'Loading..' : 'Sign Up' }
                </Button>
                </form>  
                <Link to='/login'>Login</Link>        
            </Grid>    

                    
        </div>
    );
}

export default Register;