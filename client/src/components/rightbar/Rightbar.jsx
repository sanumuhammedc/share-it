import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from '@mui/icons-material';


export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [Following, setFollowing] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));


  useEffect(() => {
    
    const getFollowing = async () => {
      try {
        const followingList = await axios.get("users/following/" + user._id);
        setFollowing(followingList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFollowing();

  }, [user]);

  const handleClick = async () => {
    try {
      if(followed){
        await axios.put("users/" + user._id + "/unfollow", {userId: currentUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else {
        await axios.put("users/" + user._id + "/follow", {userId: currentUser._id});
        dispatch({type: "FOLLOW", payload: user._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }

    const HomeRightbar = () => {
        return (
          <>
            <div className="birthdayContainer">
              <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
              <span className="birthdayText">
                <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
              </span>
            </div>
            <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
            <h4 className="rightbarTitle">Online Friends</h4>
            <ul className="rightbarFriendList">
              {Users.map((u) => (
                <Online key={u.id} user={u} />
              ))}
            </ul>
          </>
        );
      };
    
      const ProfileRightbar = () => {
        return (
          <>
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleClick} >
              {followed ? "Unfollow"  : "Follow"}
              {followed ? <Remove/> : <Add/>}
            </button>
          )}
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From:</span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===2?"Married": " "}</span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
            <div className="rightbarFollowings">

            {Following.map((follower) => (

                <Link style={{textDecoration: "none"}} to={"/profile/"+follower.username}>
                  <div className="rightbarFollowing">
                  <img
                    src={follower.profilePicture? PF + follower.profilePicture :PF + "person/noAvatar.png"}
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{follower.username}</span>
                </div>
                </Link>
            
            ))}
              
            </div>
          </>
        );
      };
      return (
        <div className="rightbar">
          <div className="rightbarWrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
          </div>
        </div>
      );
}
