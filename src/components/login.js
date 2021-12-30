import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import { UserAuth } from './userContext/userContext';
import {Link} from 'react-router-dom';
function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    useEffect(() => {
        document.title = "AnoMSG | Login";
    }, [])
    const { SignIn, error} = UserAuth();

    const onLoginHandler = async(e) =>{
        e.preventDefault();
        setButtonClick(true);
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!loginEmail){
            setLoginPasswordError('');
            setLoginEmailError("Please enter your email.");
        }
        else if(loginEmail && reg.test(loginEmail) === false){
            setLoginPasswordError('');
            setLoginEmailError("You're email is not valid.");
        }
        else if(loginPassword.length < 5){
            setLoginEmailError('');
            setLoginPasswordError('Password should be greater than 5.');
        } else{
            setLoginPasswordError('');
            setLoginEmailError('')
            try{
                setLoading(true);
               await SignIn(loginEmail, loginPassword);
               setLoading(false);
               setLoginError('Success');
            }catch(err){
                setLoading(false);
                setLoginError('Email and password did\'n match. ');
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
            {
                loginError ?
                ( <Alert severity="error" style={{ margin: '10px 0px' }}>{loginError}</Alert> ) :
                ( '' )
            }
        
            <TextField
                helperText={loginEmailError ? loginEmailError : ''}
                id="email"
                label="Email"
                style={{ width : '100%' , margin : '5px 0px'}}
                error ={loginEmailError ? 'true' : ''}
                value = {loginEmail}
                onChange = {(e) => setLoginEmail(e.target.value)}
            />   
            <TextField
                helperText={loginPasswordError ? loginPasswordError : ''}
                id="password"
                label="Password"
                style={{ width : '100%' , margin : '5px 0px'}}
                error = {loginPasswordError ? 'true' : ''}
                value={loginPassword}
                onChange = {(e) => setLoginPassword(e.target.value)}
            />      
            <Button disabled={buttonClick} variant="contained" style={{ width : '100%' }} onClick={onLoginHandler}>
                {loading ? 'Loading...' : 'Sign In'}
            </Button>
             <Link to='/register'>Create an account</Link>         
        </Grid>    

                
    </div> 
    );
}

export default Login;