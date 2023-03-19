import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material'; 
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 

export default function Topbar() {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    let navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();

    };

  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration: "none"}} >
            <span className="logo" >Share It</span>
            </Link>
          
        </div>

        <Link to={"/search"} className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon" />
                <input  className="searchInput" placeholder="Search for friends, posts or videos" />
              </div>
        </Link>

        <div className="topbarRight">
            <div className="topbarLinks">
                <span onClick={handleLogout} className="topbarLink">Logout</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div> 
            <Link to={`/profile/${user.username}`}>
                <img src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            } alt="" className="topbarImg" />   
            </Link>
        </div>
    </div>
  )
}
