import "./rightbar.scss";

export default function RightBar() {
  return (
    <div className="rightbar">
      <div className="chat">
        <span className="title">Contacts</span>
        <div className="user">
          <div className="user-info">
            <img src="/api/uploads/profile.png" alt="User Image" />
            <div className="indicator"></div>
            <span>User Name</span>
          </div>
        </div>
        <div className="user">
          <div className="user-info">
            <img src="/api/uploads/profile.png" alt="User Image" />
            <span>User Name 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
