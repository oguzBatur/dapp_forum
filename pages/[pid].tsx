import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IPost } from "../types/interfaces";
import { ethers } from "ethers";
import { getComments, getPost } from "../functions";
import Button from "../components/Button";

const Topic = () => {
  useEffect(() => {});

  const router = useRouter();
  const [id, setId] = useState(0);
  const [title, setTitle] = useState(router.query.pid);
  const { pid } = router.query;

  const [post, setPost] = useState<IPost>();
  function parseId() {
    if (pid && !Array.isArray(pid)) {
      const parsedPid = pid.split(/_/g)[1] as string;
      const parsedTitle = pid.split(/_/g)[0] as string;
      setTitle(parsedTitle);
      setId(Number(parsedPid));
    } else if (pid && Array.isArray(pid)) {
      const parsedPid = pid[0].split(/_/g)[1] as string;
      const parsedTitle = pid[0].split(/_/g)[0] as string;
      setTitle(parsedTitle);
      setId(Number(parsedPid));
    }
  }

  useEffect(() => {
    console.log("pid fired up");
    parseId();
    getPost(id).then((val) => {
      const postVal = val as IPost;
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
    getComments(id);
  }, [pid as any]);

  const postDate = new Date(post?.creationTime * 1000);
  const year = postDate.getFullYear();
  const month = postDate.getMonth() - 1;
  const day = postDate.getDate();

  const mapComments = async () => {
    await getComments(0);
  };

  return (
    <div className=" row-start-2 row-span-full col-start-1 col-span-5 grid grid-cols-6    text-white">
      <h1 className="text-center font-bold text-3xl pt-5 text-primary row-start-1  col-start-1 col-span-full ">
        {title}
      </h1>
      <p className=" col-start-1 col-span-full">{post?.description}</p>
      <div className="flex flex-col gap-4 col-start-1 row-start-3 row-span-2 col-span-full overflow-y-scroll">
        <div className="p-8 bg-second shadow-xl  w-full flex flex-col items-end">
          <p>Gerçekten güzel bir deneme</p>
          <p>0xf39Fd6e51aad88F6F4ce6aB8827279cffFb32132133</p>
        </div>
        <div className="p-8 bg-second  w-full flex flex-col items-end">
          <p style={{ color: "white" }}>Muhteşem bir sözlük</p>
          <p>0x239Fd6e51aad88F6F4ce6a123827279cffFb32132133</p>
        </div>
      </div>
      <p>
        <strong>{post?.author}</strong>{" "}
        <i>tarafından {`${day}.${month}.${year}`}</i> tarihinde oluşturuldu.
      </p>
      <div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={5}
          className="bg-second p-8 rounded-box "
          draggable={false}
          placeholder="Fikrinizi Paylaşın..."
        ></textarea>
        <Button>
          <p>Yorum Yap</p>
        </Button>
      </div>
    </div>
  );
};

export default Topic;
