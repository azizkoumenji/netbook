import { useContext } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";

export default function Comments() {
  const { currentUser } = useContext(AuthContext);
  const comments = [
    {
      id: 1,
      comment: "Hjhkdfqhdkshfsf",
      name: "User",
      userId: 4,
      profilePic:
        "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
    },
    {
      id: 2,
      comment:
        "Hjhkdfqhdkffff fffffffffffffffff ffffffffffffff ffffffffffffffffff ffffffffffffffff fffffffffff fffffffffffff fffffffffffffff ffffffffffffffff ffffffffffffffffffshdf dffd df fdfd fddfertr ter tz ef sdfdsge sgt ztrtez tz etezt zt etzezt fsf",
      name: "User",
      userId: 4,
      profilePic:
        "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
    },
  ];

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.img} alt="" />
        <textarea type="text" placeholder="Write a comment" />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="content">
            <img src={comment.profilePic} alt="User Image" />
            <div className="name-comment">
              <span className="name">{comment.name}</span>
              <span>{comment.comment}</span>
            </div>
          </div>
          <span className="time">1 min ago</span>
        </div>
      ))}
    </div>
  );
}
