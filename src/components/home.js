import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import {Link} from 'react-router-dom';
import { query, collection, orderBy, onSnapshot, limit, getDoc, startAfter, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {UserAuth} from './userContext/userContext'
function Home() {
    const {currentUser} = UserAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState();
    const uid = currentUser.uid;
    const [loadMore, setLoadMore] = useState(false);

    const uniqueMessages = Array.from(new Set(messages.map(a => a.id)))
    .map(id => {
      return messages.find(a => a.id === id)
    });

    useEffect(() => {
        document.title = "AnoMSG | " + currentUser.displayName ;
        function getMessages(){
            const message_query = query(collection(db, 'users', uid , 'messages'), orderBy('time', 'desc'), limit(5));
            onSnapshot(message_query, (onQuerySnapshot) => {
                setLoading(true);
                const messageN = onQuerySnapshot.docs.map((doc) => ({
                    id : doc.id,
                    data : doc.data()
                  }));
                  setMessages((prevMessage) => [
                    ...messageN,
                    ...prevMessage,
                ]); 

                setLoading(false);
    
            });
        }
          getMessages();

    }, [])


    const NewMSG = async(e) => {
        e.preventDefault();
        const lastVisible = messages[messages.length - 1].id;
        setLoadMore(true);
        if(lastVisible){
            try{
                const citiesRef = collection(db, "users", uid, 'messages');
                const docSnap = await getDoc(doc(citiesRef, lastVisible));
                const newMsgQuery  = query(collection(db, 'users', uid, 'messages' ), orderBy('time', 'desc') ,startAfter(docSnap), limit(5));
                    onSnapshot(newMsgQuery, (newMessages) => {
                    setLoading(true);
                    const newMsg =  newMessages.docs.map((doc) => ({
                        id : doc.id,
                        data : doc.data()
                    }));
                    setMessages((prevMessage) => [
                        ...prevMessage,
                        ...newMsg      
                    ]);                  
                    setLoading(false);
                });



            }catch(err){
                console.log(err);
            }

        }
        setLoadMore(false);           
    }
    return ( 
        <div>
            <Alert variant="filled" severity="success" style={{maxWidth: '500px', margin : '15px auto'}}>
                  Share your link <br/>
                    <strong>{window.location.hostname}/{currentUser.displayName}</strong>           
            </Alert>
            
            { 
               loading ? 
               (
                    <Typography gutterBottom variant="p" component="div" style={{ textAlign: 'center' }}>
                    'Loading..' 
                    </Typography>   
               ) :  (
                uniqueMessages.length > 0 ? (
                    <div>
                  { uniqueMessages.map((msg) => (
                    <Card key={msg.id} sx={{ maxWidth: 500 }} style={{ margin : '15px auto', display : 'block' }} >

                    <CardContent>
                        <Typography gutterBottom variant="p" component="div">
                           { new Date(
                                msg.data.time.seconds * 1000 + msg.data.time.nanoseconds / 1000000,
                              ).toDateString() + " " + msg.data.time.toDate().toLocaleTimeString()
                            }
                        </Typography> 
                        <Typography gutterBottom variant="p" component="div">
                        {msg.data.city}
                        </Typography>    
            
                        <Typography variant="body2" color="text.secondary">
                        {msg.data.message}
                        </Typography>
                    </CardContent>

                    </Card>
                   )) }
                   <Button disabled={loadMore} variant="contained" style={{margin: '10px auto', display :'block' , maxWidth : '500px', width : '80%'}} onClick={NewMSG}>
                        {loadMore ? 'Loading...' : 'Load More'}
                    </Button>     
                    </div>
                ) : 
                (
                    <Typography gutterBottom variant="p" component="div" style={{ textAlign: 'center' }}>
                    'No messages found yet.' 
                    </Typography>   
                )
                ) 
            }

        

    </div>
    );
}

export default Home;
