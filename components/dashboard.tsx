import { ReactComponentElement, useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "react-daisyui";
import { getPost } from "../functions";

const Dashboard = () => {
  const placeHolderTopics = [
    "çok önemli birşeyler oldu",
    "daha önemli şeylerde olabilirmiş gibime geldi",
    "beklemiyordum bu insanların böyle olmasını aslında",
    "alıştım bu saatlerde uyanmaya 11 de uyanıyorum normalde",
    "rahat takılmak istiyorum ama uyu geç işte boşver",
    "uzun süre rahat olmicaz o yüzden değer",
    "çok önemli birkaç şey daha olmuş gibi",
  ];

  const [posts, setPosts] = useState([""]);

  useEffect(() => {
    getPost(0).then((val) => {
      console.log(val);
      setPosts([...posts, val[1]]);
    });
  }, []);

  function mapTopics() {
    return posts.map((val, ind) => {
      return (
        <Menu.Item className="w-full" key={ind.toString()}>
          <Link href={`/${val}`} id="">
            <p
              title={val}
              className="overflow-ellipsis text-first overflow-hidden inline-block  w-full whitespace-nowrap"
            >
              {val}
            </p>
          </Link>
        </Menu.Item>
      );
    });
  }
  return <Menu className="absolute bg-third h-screen w-64">{mapTopics()}</Menu>;
};

export default Dashboard;
