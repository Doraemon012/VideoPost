import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {firebase} from "../initFirebase"
import { child, get } from "firebase/database"
import { getDownloadURL, getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import { toast } from "react-toastify";
import share_btn from "../assets/icons/share_btn.png"

const Styles = makeStyles((theme)=>({
    videos:{
        position: 'absolute',
        left: '0',
        top: '4em',
        width: 'auto',
        height: 'auto',
    },
    container:{
        height:'100%', width:'100%', backgroundColor:'#1A120B',
        margin:'0em'

    },
    all_v:{

    },
    video_m: {
        margin: '0em auto auto auto',
        backgroundColor: '#1A120B',
        borderRadius: '5px',
        width: '100%', // Set the width to 100% by default
        height: 'fit-content',
        color: 'white',
        [theme.breakpoints.up('sm')]: {
          width: '80%', // Adjust width on screens larger than or equal to small breakpoint
        },
      },
      
    main:{
        background:'#fff',
        borderRadius:'5px',
        padding:'.5em',

        

    },
    Video:{
        width:'100%',
        borderRadius:'5px'

    },
    Video1:{
        width:'100%',
        borderRadius:'5px'
    },
    Title:{
        color:'#333',
        fontSize:'23px',
        paddingTop:'15px',
        paddingBottom:'15px'
        
    },video_list:{
        background:'#fff',
        borderRadius:'5px',
        height:'52em',
        overflowY:'scroll',
        padding:'10px',
        width:'40em',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto'
    },
    vid:{
        width:'100px'   ,
        borderRadius:'5px'
    },
    list:{},
    video:{
        display:'flex',
        alignItems:'center',
        gap:'15px',
        background:'#f7f7f7',
        borderRadius:'5px',
        margin:'10px',
        padding:'10px',
        border:'1px solid rgba(0, 0, 0, .1)',
        cursor:'pointer',
        minWidth:'10px',

    },
    another_container:{
        display:'grid',
        gridTemplateColumns:'2fr 1fr',
        gap:'15px',
        alignItems:'flex-start',
        padding:'5px 5%',
    },
    thumbnail:{
        width:'400%'
    },
    shareee:{
        width:'1.7em',

    },
    shareBtn:{
        backgroundColor:'inherit', border:'none', marginTop:'.5em', float:'right', '&:hover':{cursor:'pointer'}
    },
    all_desc: {
        width: '90%', // Default to 100% width
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.up('sm')]: {
          width: '100%', // Adjust width on screens larger than or equal to small breakpoint
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      
  }))


const db = firebase.database()


export const Video = () => {
    const storage = getStorage()

    const styles = Styles()
    const { id } = useParams();
    const [videoUrl, setVideoUrl] = useState("")
    const [title, setTitle] = useState('Video title goes here ...')
    const [desc, setDesc] = useState('Some description...')
    const [mail, setMail] = useState('')
    var likes = 0
    const [views, setViews] = useState(0)
    var likedBy = ''

    const fetch_video = (id:string) => {
        const dbRef = db.ref();
        get(child(dbRef, `videos/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
            const data = snapshot.val()

            const videoRef = ref(storage, `/videos/video-${id}`)
            getDownloadURL(videoRef).then(
                function(value) {
                    setVideoUrl(value.toString())
                },
                function(error) { 
                    
                    console.log(error)
                    }
            )
            
            setTitle(data['title'])
            setDesc(data['description'])
            likes = data['likes']
            setViews(data['views'])
            likedBy = data['liked_by']
            setMail(data['email'])

            const like_counter_button = document.getElementById('like_counter_button')
            // db.ref(`videos/${id}`).update({ 'liked_by' : likedBy});
            if (like_counter_button !== undefined){
                (like_counter_button as HTMLButtonElement).innerText = likes + ' '+  '🤍'
            }
            if (likedBy.includes(`${window.$userEmail}`)){
                const like_counter_button = document.getElementById('like_counter_button')
                if (like_counter_button !== undefined){
                    (like_counter_button as HTMLButtonElement).disabled = true
                }
    
            }
            }else{
                console.log('wrong !!')
            }
        }).catch((error) => {
            // console.error(error);
        });
        
    }
    const like_video = () => {
        if (window.$userEmail !== undefined){
            if (likedBy.toString().includes(`${window.$userEmail}`)){
                const like_counter_button = document.getElementById('like_counter_button')
                if (like_counter_button !== undefined){
                    (like_counter_button as HTMLButtonElement).disabled = true
                }
    
            }else{
                likedBy = likedBy + " " + window.$userEmail
                likes = likes + 1
    
                console.log(db.ref(`videos/${id}`))
                const like_counter_button = document.getElementById('like_counter_button')
                // db.ref(`videos/${id}`).update({ 'liked_by' : likedBy});
                if (like_counter_button !== undefined){
                    (like_counter_button as HTMLButtonElement).innerText = likes + ' '+  '🤍'
                }
    
                db.ref(`videos/${id}`).update({ 'likes' : likes});
                db.ref(`videos/${id}`).update({ 'liked_by' : likedBy});
                console.log('likes')
            }
        }
        else{
            toast.error('Signin first !')
        }

    }



    console.log('code ran')
    fetch_video(`${id}`)

    
    
    // 
    return (

       <div style={{height:'100%', width:'100%', backgroundColor:'#1A120B', marginBottom:'5em'}} className={styles.container}>
           <div className={styles.all_v}>
                <div className={styles.video_m} style={{display:'block', marginLeft:'auto', marginRight:'auto'}}>
                        <video preload="auto"  className={styles.Video} src={videoUrl} controls ></video>
                        <div> <button onClick={()=>{like_video()}} id="like_counter_button" style={{backgroundColor:'inherit', color:'white', fontSize:'1.2em', border:'0px'}}>🤍</button> <button className={styles.shareBtn} onClick={()=>{
                             navigator.clipboard.writeText(window.location.href);
                             toast.success('Url Copied !')
                        }}><img  src={share_btn} alt="" className={styles.shareee} /></button></div>
                        <div  className={styles.all_desc}>
                        <h1 style={{color:'white', margin:'1em auto 1em auto'}}>{title}</h1>
                        <div><p style={{color:'white'}}><b>Uploaded By</b> : {mail}</p></div>
                        <p style={{color:'white' , margin:'auto auto 3em auto'}}><b>Description</b> : <p>{desc}</p></p>
                        </div>
                </div>

           </div>

        </div>
    )
}