import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'
import {firebase} from "../initFirebase"
import { getDatabase, ref, child, get } from "firebase/database";
import {getDownloadURL, ref as storageRef, uploadBytes} from 'firebase/storage'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import("crypto")
// yes
const Styles = makeStyles((theme)=>({ //here
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

    // 👍 no ismai display vagera aayga, attributes aayenge
    
  }))
// yahan edit karo idhar kya karna haiha
// json aati hai?
// toh naam likhke colorn lagake curly braces open kar lo aur upar wale format ko follow kar lo

// const auth = getAuth();
const db = firebase.database();

export const SignIn = () => {
    const storage = getStorage()
    const [imageUrl, setImageUrl] = useState(undefined);

    const styles = Styles()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const [pic, setPic] = useState<any|null>(null)

    const auth = getAuth()



    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const handleCPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCPassword(event.target.value)
    }
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const create_account = () =>{
        
        if (username!=="" && password!=="" && cPassword!=="" && email!=""){
            if (password == cPassword){


                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential
                    console.log(user)
                    // ...ab dikh raha hai ?
                    // yass okokok line 29 par jao
                    // 9-28 tak edit kao
                    console.log(auth.currentUser)
                    const usersRef = db.ref("users")
                    const user_email_to_post = encodeURIComponent(`${email}`).replace(/\./g, '%2E')
                    get(child(usersRef, user_email_to_post)).then((snapshot) => {
            
                        if (snapshot.exists()) {
                            // const newUserRef = db.ref("users/"+user_email_to_post+"/pic")
                            // newUserRef.set(`${response.user.photoURL}`)
                        } else {
                            const newUserRef = usersRef.child(user_email_to_post)
                            newUserRef.set({"name":`${username}`,
                                "email":user_email_to_post,
                                "pic":"",
                            })
                            toast.success('Signed up success fully !')
                            window.location.href = `../login`

              
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
                toast.error("The password dosen't match !")

            }

        }else{
            toast.error("Fill all the required fields !")

        }
    }


    return (
        <div style={{height:'100vh', width:'100%', display:'flex', backgroundColor:'#1A120B'}}>
            <div className={styles.login_card}>
                <p className={styles.login_heading}>Sign Up</p>
                <input type="text" placeholder="Username" onChange={handleUsernameChange} className={styles.name}/>
                <br />
                <input type="text" placeholder="e-Mail" onChange={handleEmail} className={styles.name}/>
                <br />
                <input type="password" placeholder="Password" onChange={handlePassword} className={styles.name}/>
                <br />
                <input type="password" placeholder="Conform Password" onChange={handleCPassword} className={styles.name}/>
                <br />

                <button onClick={()=>{create_account()}} className={styles.sign}>Sign Up</button>
                <div className={styles.dont}>Already have an account? <a href="../login" className={styles.link}>&nbsp;Log In</a></div>
                <div className={styles.dont}>&#169; Neyati IIITDM, Jbalpur</div>
            </div>
        </div>
    )
}
