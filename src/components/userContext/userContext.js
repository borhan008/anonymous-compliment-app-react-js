import React, { useContext, useEffect, useState } from 'react';
import {db} from '../../firebase';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const UserContext = React.createContext();


export function UserAuth(){
    return useContext(UserContext);
}

export function AuthProvider({ children }){
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
    useEffect(() => {
        const auth = getAuth();
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    async function SignUp(email, password, username){
        const auth = getAuth();       
  
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName : username
        });
        const user = auth.currentUser;
        setCurrentUser({
            ...user
        });
        const user_id = user.uid;
        setDoc(doc(db, 'users', user_id), {
            username : user.displayName
        });
     
    }

    function SignIn(email, password){
        const auth = getAuth();
     
            return signInWithEmailAndPassword(auth, email, password);
           
       
    };

    function signUserOut(){
        const auth = getAuth();       
        setLoading(true);
        signOut(auth);
        setLoading(false);
    }


    const values = {
        loading,
        currentUser,
        SignUp,
        SignIn,
        signUserOut
    }
    return(
        <UserContext.Provider value={ values }>
            { children }
        </UserContext.Provider>
    );
}