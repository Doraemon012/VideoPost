
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {firebase} from "../initFirebase"
import { getDatabase, ref, child, get } from "firebase/database";
export interface IAuthRouteProps {
    children: React.ReactNode;
}
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const auth = getAuth();
    const children = props.children;
    const [loading, setLoading] = useState(false);
    console.log('auth route here...')
    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
          
          
            if (user) {
                console.log(user.email)
                window.$userEmail = `${user.email}`
                // setLoading(false);
                // console.log("user", user.toJSON())
                
                const db = firebase.database();
                const usersRef = db.ref("users")
                usersRef.on("value", snapshot => {
                  const noo = snapshot.exportVal()
                  const newRef = noo[encodeURIComponent(`${user.email}`).replace(/\./g, '%2E')]
                  if (newRef !== undefined){
                    console.log('exitsts', newRef)
                    window.$userName = `${newRef['name']}`


                  }else{
                    console.log('Go back')
                  }
                })
            }
        });

    
        
        return () => AuthCheck();
    }, [auth]);
    if (loading) return <div>Main</div>;

    return <>{children}</>;
};
export default AuthRoute;
