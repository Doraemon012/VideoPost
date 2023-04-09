import {makeStyles} from "@material-ui/core"
import logo from '../assets/logo.png'
import user_pic from '../assets/user_pic.png'
import add from '../assets/add.png'
import person from '../assets/icons/person.png'
import pl from '../assets/icons/pl.png'
import ply from '../assets/ply.png'
const Styles = makeStyles((theme)=>({
    headers:{
        height:'3em',
        width:'100%',
        backgroundColor:'#88E1F2', 

    },
    logo_image:{
        width:'5em',
        marginLeft:'1em',
        display:'inline-flex',
        float:'left',
        filter:'drop-shadow(2px 4px 6px black)'
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
            <div><a href="../"><img src={ply} alt="" className={styles.logo_image} /></a></div>
            <div><a href="../login"><img src={person} alt="" className={styles.user} /></a></div>
            <div><a href="../create"><img src={pl} alt="" className={styles.create} /></a></div>

        </div>
    )
}