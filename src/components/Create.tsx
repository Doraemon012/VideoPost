import {makeStyles} from "@material-ui/core"
import { useState } from "react"
import {firebase} from "../initFirebase"
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { getStorage } from "firebase/storage"
import { child, get } from "firebase/database"
import { toast } from "react-toastify"
// import { randomUUID } from "crypto"

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


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
    name_vid:{
        marginBottom:'1em',
        borderRadius:'.4em',
        padding:'0em 1em 0em 1em',
        backgroundColor:'#312F44', 
        border:'0px',
        minHeight: '2em',
        color:'white',
        fontSize: '1em',
    },
    // get_blind
}))


const db = firebase.database()


export const Create = () => {
    const styles = Styles()

    const storage = getStorage()
    
    
    const [thumbnailUrl, setTHumbnailUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [videoFile, setVideoFile] = useState<any|null>(null)
    const [thumbnail, setThumbnail] = useState<any|null>(null)

    const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setThumbnail(event.target.files?.[0] || null);
    };
    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoFile(event.target.files?.[0] || null);
    };
    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value);
    };
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };


    const upload_all = () =>{

        if (window.$userEmail !== undefined){
            if (thumbnail!==null && videoFile!==null && desc!=="" && title!==''){
                const id = generateUUID()
    
                const imageRef = ref(storage, `/images/thumbnail-${id}`)
                toast.promise(
                    uploadBytes(imageRef, thumbnail).then(()=>{
                                    
                        getDownloadURL(imageRef).then(
                            function(value) {
                                setTHumbnailUrl(value.toString())
                            },
                            function(error) {
                                console.log(error)
                                
                            }
        
                        )                
        
                    })
                    , {
                    pending: 'Uploading thumbnail...',
                    success: 'Thumbnail Uploaded !',
                    error: 'Failed to upload Thumbnail',
                 })
                
                const videoRef = ref(storage, `/videos/video-${id}`)
                
                toast.promise(
                    uploadBytes(videoRef, videoFile).then(()=>{
                        getDownloadURL(videoRef).then(
                            function(value) {
                                setVideoUrl(value.toString())
                                console.log('a', value)
                            },
                            function(error) { 
                                
                                console.log(error)
                             }
                        )
                        const videoSRef = db.ref("videos")
                        const video_to_post = encodeURIComponent(`${id}`)
                        const time = new Date()
                        get(child(videoSRef, video_to_post)).then((snapshot) => {
                            if (snapshot.exists()) {
                            } else {
                                console.log(thumbnailUrl, videoUrl)
                                const newVideoRef = videoSRef.child(video_to_post)
                                newVideoRef.set({"uploader":`${window.$userName}`,
                                    "email":`${window.$userEmail}`,
                                    "pic":"",
                                    'id':`${id}`,
                                    'likes':'0',
                                    'views':'0',
                                    'upload_time':`${time}`,
                                    'description':`${desc}`,
                                    'title':`${title}`,
                                    'comments':'',
                                    'liked_by':''
                                })
                                window.location.href = `../video/${id}`
                    
                            }
            
                        }).catch((error) => {
                        console.error(error);
                        });
                    })
                    , {
                    pending: 'Uploading Video...',
                    success: 'Video uploaded !',
                    error: 'Failed to upload Video !',
                })
                
    
            }else{
                toast.error("Fill all the required fields !")
            }
        }else{
            toast.error("Login First")
            window.location.href = `../login`   
        }
       
    }
    return (
        <div style={{height:'100vh', width:'100%', display:'flex', backgroundColor:'#1A120B'}}>
            <div className={styles.login_card}>
                <p className={styles.login_heading}>Upload Video</p>
                <input type="text" placeholder="Title"  className={styles.name} onChange={handleTitleChange}/>
                <br />
                <input type="text" placeholder="Description"  className={styles.name} onChange={handleDescChange}/>
                <br />
                <span style={{color:'white'}}>Video:<input type="file" style={{padding:'0em .5em 0em .5em'}}onChange={handleVideoUpload}  className={styles.name} accept="video/mp4,video/x-m4v,video/*"/></span>
                <br />
                <span style={{color:'white'}}>Thumbnail:<input type="file" onChange={handleThumbnailUpload}  style={{padding:'0em .5em 0em .5em'}} className={styles.name} accept="image/*"/></span>
                <br />
                <button onClick={()=>{upload_all()}} style={{borderRadius:'.4em',fontWeight:'bold',
        marginBottom:'1em',
        marginTop:'2em',
        backgroundColor:'#88E1F2', 
        minWidth: 'max-content',
        padding:'0em 2em 0em 2em',
        border:'0px',
        minHeight: '2em',
        color:'black',
        fontSize: '1em',}}>Upload</button>
            </div>
        </div>
    )
}

//ullu kakau