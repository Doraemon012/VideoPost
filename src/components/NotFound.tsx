import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'
import { useEffect, useState } from "react"

import {firebase} from "../initFirebase"
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify"
const Styles = makeStyles((theme)=>({
    page:{
        color:'white',
        width:'100%',
        height:'95vh',
    },
    card:{
        position:'relative',
        width:'fit-content',
        padding:'5vw',
        textAlign:'center',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        top: '50%',
        transform :'translateY(-50%)',
        border : '5px solid',        
        borderImage:'linear-gradient(blue, aqua, aquamarine) 30',

    },
    h1s:{
        fontSize:'10vh',
        textShadow:'5px 5px 5px rgba(46,91,173,1)'
        

    },
    h2s:{
        fontSize:'5vh'
    }
  }))

  
const db = firebase.database();

export const NotFound = () => {
    const styles = Styles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = getAuth()

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h1 className={styles.h1s}>404</h1>
                <h2 className={styles.h2s}>This page was not found</h2>
            </div>
        </div>
    )
}