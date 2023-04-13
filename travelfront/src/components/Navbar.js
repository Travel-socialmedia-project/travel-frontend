import {Link} from "react-router-dom"


function Navbar () {


    return ( 
        <nav className={"NavBar"}>
        <Link to="/">
          <button>Home</button>
        </Link>
       
          
        <Link to="/albums">
          <button>Albums</button>
        </Link>
        </nav>
    
   
    )
}








export default Navbar;