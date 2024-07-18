import "./rightbar.scss";

export default function RightBar() {
  return (
    <div className="rightbar">
      <div className="suggestions">
        <span className="title">Suggestions for You</span>
        <div className="user">
          <div className="user-info">
            <img src="" alt="User Image" />
            <span>User Name</span>
          </div>
          <button>Follow</button>
        </div>
      </div>
      <div className="activities">
        <span className="title">Latest Activities</span>
        <div className="user">
          <div className="user-info">
            <img src="" alt="User Image" />
            <span>User Name</span>
          </div>
          <span className="description">Posted an image.</span>
          <span className="description">1 min ago</span>
        </div>
      </div>
      <div className="online">
        <span className="title">Online Friends</span>
        <div className="user">
          <div className="user-info">
            <img src="" alt="User Image" />
            <div className="indicator"></div>
            <span>User Name</span>
          </div>
        </div>
      </div>
    </div>
  );
}
