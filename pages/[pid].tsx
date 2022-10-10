import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SozlukNavbar from "../components/navbar";
import Dashboard from "../components/dashboard";
import { ESozlukError } from "../types/enums";
import { IAccount, IPost } from "../types/interfaces";
import { BigNumber, ethers } from "ethers";
import { getPost } from "../functions";

const Topic = () => {
  useEffect(() => {});

  const router = useRouter();
  const [id, setId] = useState(0);
  const [title, setTitle] = useState(router.query.pid);
  const { pid } = router.query;

  const [post, setPost] = useState<IPost>();
  function parseId() {
    if (pid) {
      const parsedPid = pid.split(/_/g)[1] as string;
      const parsedTitle = pid.split(/_/g)[0] as string;
      setTitle(parsedTitle);
      setId(Number(parsedPid));
    }
  }

  useEffect(() => {
    parseId();
    getPost(id).then((val) => {
      const postVal = val as IPost;
      console.log(postVal.author);
      console.log(ethers.utils.formatUnits(val.creationTime._hex, 0));
      setPost({
        author: postVal.author,
        creationTime: Number(
          ethers.utils.formatUnits(val.creationTime._hex, 0)
        ),
        description: postVal.description,
        id: postVal.id,
        title: postVal.title,
        votes: postVal.votes,
      });
    });
  }, []);

  const postDate = new Date(post?.creationTime * 1000);
  const year = postDate.getFullYear();
  const month = postDate.getMonth() - 1;
  const day = postDate.getDate();

  return (
    <main>
      <div className=" flex flex-col gap-4  pl-40 min-h-screen  bg-primary-content items-center">
        <h1 className="text-center font-bold text-3xl pt-5 text-primary ">
          {title}
        </h1>
        <p style={{ color: "black" }} className=" p-2  rounded-box ">
          {post?.description}
        </p>

        <div className="p-8 bg-third  w-full flex flex-col items-end">
          <p style={{ color: "white" }}>Gerçekten güzel bir deneme</p>
          <p>0xf39Fd6e51aad88F6F4ce6aB8827279cffFb32132133</p>
        </div>
        <div className="p-8 bg-third  w-full flex flex-col items-end">
          <p style={{ color: "white" }}>Muhteşem bir sözlük</p>
          <p>0x239Fd6e51aad88F6F4ce6a123827279cffFb32132133</p>
        </div>

        <p style={{ color: "black" }}>
          <strong style={{ color: "black" }}>{post?.author}</strong>{" "}
          <i>tarafından {`${day}.${month}.${year}`}</i> tarihinde oluşturuldu.
        </p>
      </div>
    </main>
  );
};

export default Topic;
