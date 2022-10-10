import { ReactComponentElement, useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "react-daisyui";
import { getPost, getPostCount } from "../functions";
import { IPost, IPostArray } from "../types/interfaces";

const Dashboard = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getPostCount().then((count) => {
      console.log(Number(count));
      for (let i = 0; i < Number(count); i++) {
        getPost(i).then((val) => {
          const _val = val as IPost;
          console.log(_val.title);

          setPosts([
            ...posts,
            {
              author: _val.author,
              creationTime: _val.creationTime,
              description: _val.description,
              id: _val.id,
              title: _val.title,
              votes: _val.votes,
            },
          ]);
        });
      }
    });
  }, []);

  function mapTopics() {
    console.log("Size of posts: ", posts);
    return posts.map((val, ind) => {
      if (ind < 21) {
        return (
          <Menu.Item className="w-full" key={ind.toString()}>
            <Link href={`/${val.title}_${val.id}`} id="">
              <p
                title={val.title}
                className="overflow-ellipsis text-first overflow-hidden inline-block  w-full whitespace-nowrap"
              >
                {val.title}
              </p>
            </Link>
          </Menu.Item>
        );
      }
    });
  }
  return <Menu className="absolute bg-third h-screen w-64">{mapTopics()}</Menu>;
};

export default Dashboard;
