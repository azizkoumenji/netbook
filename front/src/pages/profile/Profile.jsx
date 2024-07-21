import Post from "../../components/post/Post";
import "./profile.scss";

export default function Profile() {
  const posts = [
    {
      id: 1,
      username: "User",
      userId: 1,
      profilePic:
        "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
      img: "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
      desc: "Jdhjfshkdhfksdhfjkskhfdsjhfkjdsfhjskhfkjsd",
      likes: 20,
      commentCount: 8,
    },
    {
      id: 2,
      username: "User",
      userId: 2,
      profilePic:
        "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
      img: "https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg",
      desc: "Jdhjfshkdhfksdhfjkskhfdsjhfkjdsfhjskhfkjsd",
      likes: 20,
      commentCount: 8,
    },
  ];

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg"
          alt="Cover"
        />
        <img
          src="https://www.scusd.edu/sites/main/files/imagecache/tile/main-images/camera_lense_0.jpeg"
          alt="Profile Picture"
        />
      </div>
      <div className="profile-container">
        <div className="left">
          <i className="bi bi-cake2-fill"></i>
          <span>June 12th, 2004</span>
        </div>
        <div className="center">
          <span>Jack Smith</span>
          <button>Follow</button>
        </div>
        <div className="right">
          <i className="bi bi-envelope-at-fill"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
