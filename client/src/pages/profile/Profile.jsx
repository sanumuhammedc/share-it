import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";



export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [User, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      setUser(res.data);
      console.log(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={User.coverPicture || PF + "person/noCover.png"}
                alt=""
              />
              <img
                className="profileUserImg"
                src={User.profilePicture? PF + User.profilePicture :PF + "person/noAvatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{User.username}</h4>
                <span className="profileInfoDesc">{User.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={User} />
          </div>
        </div>
      </div>
    </>
  )
}
