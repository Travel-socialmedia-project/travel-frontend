import { Link, useParams } from "react-router-dom";
import { Auth } from "../components/auth";
import { useContext } from "react";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(Auth);
  const { userId } = useParams();
  return (
    <nav className={"NavBar"}>
      <Link to="/">
        <button>Home</button>
      </Link>
      {isLoggedIn && (
        <>
          <Link to="/albums">
            <button>Albums</button>
          </Link>
          <button onClick={logOutUser}>Logout</button>
         <Link to = {`/user/${user._id}`}> <span>{user && user.name}</span> </Link>
        </>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;


