import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import Link from "next/link";
import { getPost, getPostCount } from "../functions";
import { IPost } from "../types/interfaces";
import List from "./ListItem";
import { UserContext } from "../UserContext";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = useCallback(
    (val: any, count: Number) => {
      const _val = val as IPost;

      if (posts.length <= count) {
        setPosts((posts) =>
          posts.concat({
            author: _val.author,
            creationTime: _val.creationTime,
            description: _val.description,
            id: _val.id,
            title: _val.title,
            votes: _val.votes,
          })
        );
      }
    },
    [posts.length]
  );

  const getPostsWithPostCount = useCallback(() => {
    getPostCount().then((count) => {
      for (let i = 0; i < Number(count); i++) {
        getPost(i)
          .then((val) => getPosts(val, Number(count)))
          .catch((err) => console.error("GetPostError: ", err));
      }
    });
  }, [getPosts]);

  useEffect(() => {
    console.log("Dashboard Fired Up");
    getPostsWithPostCount();
  });

  function mapTopics() {
    return posts.map((val, ind) => {
      if (ind < posts.length / 2) {
        return (
          <List key={ind.toString()}>
            <Link href={`/${val.title}_${val.id}`} id="">
              <p
                title={val.title}
                className="overflow-ellipsis  overflow-hidden inline-block  w-full whitespace-nowrap"
              >
                <button className=""></button>
                {val.title}
              </p>
            </Link>
          </List>
        );
      }
    });
  }
  return (
    <div className=" bg-second row-start-2 col-start-6 row-span-full ">
      {mapTopics()}
    </div>
  );
};

export default Dashboard;
