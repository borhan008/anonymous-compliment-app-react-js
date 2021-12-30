import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {db} from '../firebase'
import {collection, query, getDocs, where, addDoc, serverTimestamp} from 'firebase/firestore';
function SendMsg() {
    const {sendUsername} = useParams();
    const [notFound, setNotFound] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [userDetails, setUserDetails] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [buttonClick, setButtonClick] = useState(false);
    useEffect(() => {
        document.title = "AnoMSG | Send Message to " + sendUsername ;
        const GetUserData = async() => {
            setLoading(true);
            const q = query(collection(db, 'users'), where ('username', '==',sendUsername));
            const querySnapshot = await getDocs(q);
            let count = 0;
            querySnapshot.forEach((user) => {
                count +=1;
            });
    
            if(count == 1){
                setNotFound(false);
                setLoading(false);
            }else{
              setNotFound(true);
              setLoading(false);
            }
        }
        GetUserData();
        const userIp = () => {
            fetch("https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0")
            .then( response => response.json() )
            .then( data => setUserDetails(data))
        }

        userIp();  

    }, [sendUsername]);

    const sendMsessage = async(e) => {
        e.preventDefault();
        setButtonClick(true);
        if(message.length < 20){
            setMessageError("Message length should be greater than 20");
        }else{
            setMessageError('');
            const q = query(collection(db, 'users'), where ('username', '==',sendUsername));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(user) => {
                const uid =  user.id;
                try{
                    setLoading(true);
                    await addDoc(collection(db, 'users', uid, 'messages'), {
                        message : message,
                        time : serverTimestamp(),
                        ip : userDetails.IPv4,
                        city : userDetails.city
                    });
                    setMessage('');
                    setSuccess(true);
                    setLoading(false);
                }catch(err){
                    setLoading(true);
                    setSuccess(false);
                    setError(true);
                    setLoading(false);
                }
            });
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
          sx={{ maxWidth: 500 }} 
          style={{ margin: '10px auto' }}
        >  
        
          {
            loading  ? (
           'Loading..' 
            ) : (
            notFound ? (
                <Typography gutterBottom variant="h6" component="div">
                There's no user named <strong>{sendUsername}</strong>
                </Typography>
                
            ) : (

                <div>
                {
                success ? (
                    <Alert severity="success">Message Sent successfully. </Alert>
                   ) : (
                    error ? (
                        <Alert severity="Error">Message couldn't be sent. </Alert>
                    ) : (
                        ' '
                    )
                   )
                } 

               
                <Typography gutterBottom variant="h6" component="div">
                Send an anonymoous message to <strong>{sendUsername}</strong>
                </Typography>
                <TextField
                    id="outlined-textarea"
                    label={`Message to ${sendUsername}`}
                    placeholder={`Message to ${sendUsername}`}
                    helperText={messageError ? messageError : `Message to ${sendUsername}`}
                    multiline
                    style={{ width : '100%', margin : '10px auto' }}
                    minRows={8}
                    value={message}
                    onChange = {(e) => setMessage(e.target.value)}
                    error = {messageError ? 'true' : ''}
                    
                />    
                <Button variant="contained" disabled={buttonClick} style={{ width : '100%' }} onClick={sendMsessage}>
                    { buttonClick ? 'Loading..' : 'Send'}
                </Button>    
                </div>
            )
           ) 
           }                 
        </Grid>               
    </div> 
    );
}

export default SendMsg;
