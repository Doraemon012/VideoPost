import {makeStyles} from "@material-ui/core"
import person from '../assets/icons/person.png'
import pl from '../assets/icons/pl.png'
// import ply from '../assets/ply.png'
import ico_m from '../assets/ico_m.png'
const Styles = makeStyles((theme)=>({
    headers:{
        height:'3em',
        width:'100%',
        backgroundColor:'#FFA447', 

    },
    logo_image:{
        width:'2.5em',
        marginLeft:'1em',
        display:'inline-flex',
        float:'left',
        filter:'drop-shadow(2px 4px 6px black)',
        position: 'absolute', top: '2.5%', transform: 'translateY(-50%)'
    },
    user:{
        display:'inline-flex',
        marginRight:'1em',
        width:'2em',
        float:'right',
        marginTop:'.5em'

    },
    create:{
        display:'inline-flex',
        marginRight:'1em',
        width:'2em',
        float:'right',
        marginTop:'.5em'

    }
  }))

  

export const Header = () => {
    const styles = Styles()
    return (
        <div className={styles.headers}>
            <div><a href="../"><img src={ico_m} alt="" className={styles.logo_image} /></a></div>
            <div><a href="../login"><img src={person} alt="" className={styles.user} /></a></div>
            <div><a href="../create"><img src={pl} alt="" className={styles.create} /></a></div>

        </div>
    )
}