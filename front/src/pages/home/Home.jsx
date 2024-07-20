import Post from "../../components/post/Post";
import "./home.scss";

export default function Home() {
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
    <div className="home">
      <div className="write"></div>
      <div className="posts">
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
