import React, { useEffect, useState, useContext } from "react";
import { Input, Textarea, Button } from "react-daisyui";
import SozlukNavbar from "../../components/navbar";
import { ESozlukError } from "../../types/enums";
import { IAccount } from "../../types/interfaces";
import Dashboard from "../../components/dashboard";
import { BigNumber, ethers } from "ethers";
import { useRouter } from "next/router";
import { UserContext } from "../../UserContext";
import { createPost } from "../../functions";

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
  });

  return (
    <div className="h-screen pl-12 flex flex-col items-center">
      <h1 className="text-center font-bold text-3xl mt-12">Gönderi Oluştur</h1>
      <div className="flex flex-col gap-3 w-1/2 h-1/2  mt-12 ">
        <Input
          onChange={(_title) => {
            if (_title.target.value.trim().length > 0) {
              setTitle(_title.target.value);
            }
          }}
          className="w-full"
          placeholder={"Başlık"}
        />
        <Textarea
          onChange={(_desc) => {
            if (_desc.target.value.trim().length > 0) {
              setDesc(_desc.target.value);
              console.log(desc);
            }
          }}
          className="h-1/2"
          placeholder={"Açıklama"}
        />
        <Button onClick={handleNewEntry}>{"Entry Yolla!"}</Button>
      </div>
    </div>
  );
};
export default CreatePost;
