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

const Styles = makeStyles((theme) => ({
    thumbnail: {
        width: '400px', // Adjust this width to match the desired width in pixels
        height: '225px', // 16:9 aspect ratio
        borderRadius: '0.3em',
        objectFit: 'cover',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
            maxHeight: "100%",           
          },
      },
    card_content: {
      padding: '5px', // Adjust the padding to reduce space between thumbnail and text
    },
    VTitle: {
      margin: '0',
      fontSize:"16px"
    },
    name: {
      margin: '10px 0',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: '20px',
    },
    vidwe: {
        textDecoration: 'none',
        color: 'white',
        display: 'block',
        margin: '10px', // Add padding between the links
      },
      video_card: {
        width: '100%', // Set card width to 100% on all screens
        height: 'auto',
        margin: '10px',
        borderRadius: '0.3em',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        backgroundColor: 'rgb(26, 18, 11)',
        position: 'relative',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        [theme.breakpoints.down('sm')]: {
          padding: '1em', // Add padding only on small screens
          maxWidth: '80%', // Ensure the card doesn't exceed the screen width
        },
      },
    
  }));
  


export const HomePage = () => {
    const styles = Styles()
    const db = firebase.database()
const storage = getStorage()

const generate_cards = () => {
    const dbRef = db.ref();
    const cardHolder = document.getElementById('all_videos_container');
  
    listAll(ref(storage, 'images'))
      .then((res) => {
        res.items.forEach((itemRef) => {
          const onlyId = itemRef.name.slice(-36);
  
          get(child(dbRef, `videos/${onlyId}`)).then((snapshot) => {
            const a = snapshot.val();
            const link_s = a['id'];
  
            const link = document.createElement('a');
            link.className = styles.vidwe;
            link.href = `../video/${a['id']}`;
  
            const card = document.createElement('div');
            card.className = styles.video_card;
  
            const thum = document.createElement('img');
            thum.src = `https://via.placeholder.com/1920x1080/1A120B00`;
            
            thum.className = styles.thumbnail;
            const videoRef = ref(storage, `/images/thumbnail-${link_s}`)
            getDownloadURL(videoRef).then(
                function(value) {
                    thum.src = value.toString()
                },
                function(error) { 
                    console.log(error)
                  }
            )
  
            const cardContent = document.createElement('div');
            cardContent.className = styles.card_content;
  
            const titleMaxLength = calculateMaxTitleLength(); // Calculate max title length based on card width
            const ttle = document.createElement('h3');
            ttle.className = styles.VTitle;
            ttle.innerText = trimText(a['title'], titleMaxLength, true, "title");
  
            const desc = document.createElement('p');
            desc.className = styles.name;
            desc.innerText = trimText(a['uploader'], 60, true, "uploader");
  
            cardHolder?.appendChild(link);
            link?.appendChild(card);
            card?.appendChild(thum);
            card?.appendChild(cardContent);
            cardContent?.appendChild(ttle);
            cardContent?.appendChild(desc);
          })
          .catch((error) => {
            console.error(error);
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // Function to calculate max title length based on card width
  const calculateMaxTitleLength = (): number => {
    // Adjust these values based on your card's font size
    const fontSize = 16; // Replace with the actual font size in pixels
  
    // Calculate the maximum number of characters that can fit in one line
    const maxCharsInOneLine = Math.floor(window.innerWidth / (fontSize * 0.6));
  
    return maxCharsInOneLine;
  };
  
  // Function to trim text and add "..." if it exceeds a certain length
  const trimText = (text: string, maxLength: number, singleLine: boolean = false, the_type:string): string => {
    if (the_type != "uploader"){
        if (singleLine) {
            return text.substring(0, maxLength - 3) + '...';
          } else {
            if (text.length > maxLength) {
              return text.substring(0, maxLength - 3) + '...';
            }
          }
          
    }
    return text;

  };

useEffect(() => {
    generate_cards()
  }, []); 

    return (
        <div style={{ backgroundColor:'#1A120B', alignContent:'center'}} className={styles.container} id="all_videos_container">
        </div>

    )
}