import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'
import { useEffect, useState } from "react"

import {firebase} from "../initFirebase"
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify"
const Styles = makeStyles((theme)=>({
    login_card:{
        backgroundColor:'#1A120B', 
        height:'min-content',
        position:'relative',
        borderRadius:'1em',
        alignItems:'center',
        boxShadow:' rgba(0, 0, 0, 0.24) 0px 3px 8px',
        textAlign:'center',
        display:'block',
        marginRight:'auto',
        marginLeft:'auto',
        marginTop: '3em',
        width:'min-content',

    },
    login_heading:{
        color:'#88E1F2',
        fontSize:'2em',
        fontWeight:'bold',
        marginTop:'.5em'
    },
    dont:{
        bottom:'0px',
        fontSize: '1em',
        //color:'#D2FAFB',
        color:'white',
        marginTop:'2em',

    }, 
    name:{
        marginBottom:'1em',
        borderRadius:'.4em',
        padding:'0em 1em 0em 1em',
        backgroundColor:'#312F44', 
        minWidth: '18em',
        border:'0px',
        minHeight: '2em',
        color:'white',
        fontSize: '1em',
    },
    ques:{
        marginBottom:'1em',
        backgroundColor:'#312F44', 
        border:'0px',
        minHeight: '2em',
        minWidth: '18em',
        color:'white',
        fontSize: '1em',
    },
    sign:{
       borderRadius:'.4em',
        fontWeight:'bold',
        marginBottom:'1em',
        marginTop:'2em',
        backgroundColor:'#88E1F2', 
        minWidth: 'max-content',
        padding:'0em 2em 0em 2em',
        border:'0px',
        minHeight: '2em',
        color:'black',
        fontSize: '1em',

    },
    link:{
        marginLeft:'1em',
        fontSize: '1em',
        color:'#D2FAFB',
        // float:'right',
    },
    name_good:{
        marginBottom:'1em',
        //borderRadius:'1em',
        backgroundColor:'#312F44', 
        minWidth: '10em',
        border:'0px',
        minHeight: '2em',
        color:'white',
        fontSize: '1em',
    }

  }))

  
const db = firebase.database();

export const Login = () => {
    const styles = Styles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = getAuth()



    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    // hey yeh login hai 
    useEffect(() => {
        // 👇️ only runs once
        toast.info('Login with your account !')
      }, []);
    


    const loginUser = () => {
        if (password!=="" && email!=""){


            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential
                console.log(user)
                toast.success('Logged in successfully with your account !')

                // ...ab dikh raha hai ?
                
                console.log(auth.currentUser)
                const usersRef = db.ref("users")
                const user_email_to_post = encodeURIComponent(`${email}`).replace(/\./g, '%2E')
                get(child(usersRef, user_email_to_post)).then((snapshot) => {
        
                    if (snapshot.exists()) {

                        console.log('logged in')
                    
                        
                    } else {

            
                    }

                }).catch((error) => {
                console.error(error);
                });

                

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == 'auth/weak-password'){
                    toast.error('The password must be at least 6 characters !')


                }
            });

        }else{
            toast.error("Fill all the required fields !")
        }
    }

    return (
        <div style={{height:'100vh', width:'100%', display:'flex',backgroundColor:'#1A120B'}}>
            <div className={styles.login_card}>
                <p className={styles.login_heading}>Login</p>
                <input type="text" placeholder="e-Mail" onChange={handleEmail}  className={styles.name}/>
                <br />
                <input type="password" placeholder="Password" onChange={handlePassword}  className={styles.name}/>
                <br />
                <button onClick={()=>{loginUser()}} className={styles.sign}>Login</button> {/*still none*/}
                <div className={styles.dont}>Don't have an account? <a href="../signIn" className={styles.link}>Sign Up</a></div>
                <div className={styles.dont}>&#169; Neyati IIITDM, Jbalpur</div>

            </div>
        </div>
    )
}