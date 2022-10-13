import { useState, useEffect } from "react";
import Link from "next/link";
import { getPost, getPostCount } from "../functions";
import { IPost } from "../types/interfaces";
import ListItem from "./ListItem";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getCount = () => {
    getPostCount()
      .then((postCount) => {
        if (postCount) {
          fetchPosts(Number(postCount));
        }
      })
      .catch(console.log);
  };

  const fetchPosts = (postCount: number) => {
    for (let i = 0; i < postCount; i++) {
      getPost(i)
        .then((post) => {
          setPosts((_posts) => [..._posts, post as IPost]); // This does work as intended.
        })
        .catch(console.log);
    }
  };

  useEffect(() => {
    getCount();
  }, []);

  function mapTopics() {
    return posts.map((val, ind) => {
      if (ind < 21) {
        return (
          <ListItem key={ind.toString()}>
            <Link href={`/${val.title}_${val.id}`} id="">
              <p
                title={val.title}
                className="overflow-ellipsis text-white overflow-hidden   w-full whitespace-nowrap"
              >
                {val.title}
              </p>
            </Link>
          </ListItem>
        );
      }
    });
  }

  return <div className={"bg-second min-h-[85vh] w-[20vw]"}>{mapTopics()}</div>;
};

export default Dashboard;
