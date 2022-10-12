import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { UserContext } from "../../UserContext";
import { createPost } from "../../functions";
import Button from "../../components/Button";

const CreatePost = () => {
  const [title, setTitle] = useState<string | undefined>();
  const [desc, setDesc] = useState<string | undefined>();

  const router = useRouter(); // This will help when we want to go back to main page.

  const userContext = useContext(UserContext); // This is our user.

  function checkIfSigned() {
    if (!userContext || !userContext.user) {
      router.push("/"); // Return to main page if not signed in
    }
  }

  function handleNewEntry() {
    createPost(title, desc).then((val) => {
      console.log(ethers.utils.formatEther(val));
    });
  }

  useEffect(() => {
    checkIfSigned();
    console.log("Gonder Oluştur Fired Up");
  });

  return (
    <div className=" row-start-2 row-span-full col-start-1 col-span-5 gap-5 grid grid-rows-6 grid-cols-6 ">
      <h1 className="text-center col-start-1 col-span-full text-white font-bold text-3xl mt-12">
        Gönderi Oluştur
      </h1>
      <input
        onChange={(_title) => {
          if (_title.target.value.trim().length > 0) {
            setTitle(_title.target.value);
          }
        }}
        className="p-2 rounded-md col-start-2 col-span-4 h-1/2 self-center row-start-2"
        placeholder={"Başlık"}
      />
      <textarea
        onChange={(_desc) => {
          if (_desc.target.value.trim().length > 0) {
            setDesc(_desc.target.value);
            console.log(desc);
          }
        }}
        className="p-2 rounded-md resize-none  col-start-2 col-span-4 row-start-3 row-span-2"
        placeholder={"Açıklama"}
      />
      <Button
        className="col-start-3 col-span-2 row-start-5 hover:text-white bg-white text-black"
        onClick={handleNewEntry}
      >
        <p>Entry Yolla!</p>
      </Button>
    </div>
  );
};
export default CreatePost;
