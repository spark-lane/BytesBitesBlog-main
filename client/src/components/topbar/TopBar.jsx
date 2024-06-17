import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const {user , dispatch} = useContext(Context);

  const handleLogout = () =>{
    localStorage.removeItem('user');
    dispatch ({ type : "LOGOUT"});
  };
  return (
    <div className="top">
      <div className="topLeft">
        {/* <img src="" className="logo"/> */}
        <span className="title">ByteBitesBlog</span>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem logout" onClick={handleLogout}>
              {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
              {user.profilePic ? (
              <img className="topImg" src={user.profilePic} alt="" />
            ) : (
              <i class="fa-solid fa-user" title="Edit Profile"></i>
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register"> 
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
