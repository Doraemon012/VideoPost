import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'
import sample_thumbnail from '../assets/smplae_thumbnail.jpg'
import sampleThumbnail from "../assets/sampleThumbnail.png"
import { child, get } from "firebase/database"
import { getDownloadURL, getStorage, ref, uploadBytes, listAll } from "firebase/storage";
import {firebase} from "../initFirebase"

import { toast } from "react-toastify";
import { useEffect } from "react"
const Styles = makeStyles((theme)=>({
    video_card:{
        backgroundColor:'#06283D',
        border:'1px solid #88E1F2',
        width:'19em',
        height:'16em',
        margin:'1.3%',
        display:'inline-flex',
        padding:'',
        borderRadius:'.3em',
        marginRight:'5em',
        marginTop:'30px',
        overflowY :'hidden'
    },
    thumbnail:{
        width:'90%',
        height:'60%',
        display:'block',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:'.5em',
        borderRadius:'.3em',


    },
    VTitle:{
    },
    userAb:{},
    name:{
    },
    views:{},
    time:{},
    user_pic:{
    width:'3em'
    },
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexWrap:'wrap'
    },
    vid:{
        // display:'flex',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        // height:'100%',
        // width:'100%',
        // border:'none',
        // cursor:'pointer',

    },
    titlw:{
        display:'block',
        paddingInline:'1em',
    },
    vidwe:{
        textDecoration:'none',
        color:'white'
    },
    all:{
        width:'100%'
    }



  }))

//   https://www.youtube.com/watch?v=3_gakM-y7hE

export const HomePage = () => {
    const styles = Styles()
    const db = firebase.database()
const storage = getStorage()

const generate_cards = () => {
    const dbRef = db.ref();

    listAll(ref(storage, 'images'))
        .then((res) => {
            res.prefixes.forEach((folderRef) => {
            });
            res.items.forEach((itemRef) => {
            const onlyId = itemRef.name.slice(-36)
            
            
            
            get(child(dbRef, `videos/${onlyId}`)).then((snapshot) => {
                var card_holder = document.getElementById('all_videos_container')
                const a =  snapshot.val()

            //     <a href='../video/10' style={{textDecoration:'none', color:'white'}}>
                //     <div className={styles.video_card}>
                //         <div style={{width:'100%'}}>
                //         <img className={styles.thumbnail} src={sampleThumbnail} alt="" />
                //         <div className={styles.titlw} ><h4 className={styles.VTitle}>3d snake game in ursina python</h4></div>
                //         <div className={styles.titlw}><p className={styles.name}>User name</p></div>
                //         </div>
                //     </div>
            //      </a>
                
                  const link_s = a['id']
                  var link = document.createElement("a")
                  link.className = styles.vidwe
                  link.href = `../video/${a['id']}`

                  var card = document.createElement("div")
                  card.className = styles.video_card

                  var card1 = document.createElement("div")
                  card1.className = styles.all

                  var thum = document.createElement("img")
                  thum.className = styles.thumbnail

                  const videoRef = ref(storage, `/images/thumbnail-${link_s}`)
                  getDownloadURL(videoRef).then(
                      function(value) {
                          thum.src = value.toString()
                      },
                      function(error) { 
                          console.log(error)
                        }
                  )


                  var cn = document.createElement("div")
                  cn.className = styles.titlw

                  var ttle = document.createElement("h4")
                  ttle.className = styles.VTitle
                  ttle.innerText = a['title']

                  
                  var cn2 = document.createElement("div")
                  cn2.className = styles.titlw

                  var name = document.createElement("p")
                  name.className = styles.name
                  name.innerText = a['uploader']

                  card_holder?.appendChild(link)
                  link?.appendChild(card)
                  card?.appendChild(card1)
                  card1?.appendChild(thum)
                  card1?.appendChild(cn)
                  cn?.appendChild(ttle)
                  card1?.appendChild(cn2)
                  cn2?.appendChild(name)



      
                  
      
                }).catch((error) => {
                    console.error(error);
                });

            });
        }).catch((error) => {
        });
}
useEffect(() => {
    generate_cards()
  }, []); 

    return (
        <div style={{ backgroundColor:'#1A120B', alignContent:'center'}} className={styles.container} id="all_videos_container">
        </div>

    )
}