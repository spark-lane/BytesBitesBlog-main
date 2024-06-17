import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <Link to={`/posts/${post._id}`} className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <div className="link">
          <span className="postTitle">{post.title}</span>
        </div>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}{" "}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </Link>
  );
}

