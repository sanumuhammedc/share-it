import "./search.css";
import { Link, useNavigate } from "react-router-dom";
import { Search, Person, Chat, Notifications, Home } from '@mui/icons-material'; 
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  let navigate = useNavigate(); 

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const filtered = users.filter((user) => {
      return user.username.toLowerCase().includes(searchValue.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();

};

  return (
    <div>

<div className="topbarContainer">
        <div className="topbarLeft">
            <Link to="/" style={{textDecoration: "none"}} >
            <span className="logo" >Share It</span>
            </Link>
          
        </div>

        <Link to={"/search"} className="topbarCenter">
            <div className="searchbar">
                <Search className="searchIcon" />
                <input type="text" autoFocus={true} onChange={handleSearch}  className="searchInput" placeholder="Search for friends" />
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
            <Link to={"/"}>
                <Home style={{color: "#fff"}} />  
            </Link>
        </div>
    </div>

      <div className="userContainer">
        {filteredUsers.map((user) => 
          <Link style={{textDecoration: "none", color:"#000"}} to={"/profile/"+user.username} key={user._id} className="Friend">
            <img
              className="FriendImg"
              src={user.profilePicture?PF + user.profilePicture: PF + "person/noAvatar.png"}
              alt=""
            />
            <span className="FriendName">{user.username}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
