import React, {useEffect, useState, useContext, useRef} from "react";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import {UserContext} from "../../UserContext";
import {createPost} from "../../functions";
import Button from "../../components/Button";

const CreatePost = () => {


    const entryTitle = useRef<HTMLInputElement>(null);
    const entryDesc = useRef<HTMLTextAreaElement>(null);
    const router = useRouter(); // This will help when we want to go back to main page.
    const userContext = useContext(UserContext); // This is our user.
    function checkIfSigned() {

        if (!userContext || !userContext.user) {
            router.push("/"); // Return to main page if not signed in
        }
    }

    function handleNewEntry() {
        if(entryDesc.current && entryTitle.current) {
            if(entryDesc.current.value.trim().length > 0 && entryTitle.current.value.trim().length > 0) {
                createPost(entryTitle.current.value, entryDesc.current.value).then((val) => {
                    console.log(ethers.utils.formatEther(val));
                }).catch(console.log);
            }
        }
    }

    useEffect(() => {
        checkIfSigned();
        console.log("Gonder Oluştur Fired Up");
    });

    return (
        <div className=" gap-5 grid grid-rows-6 grid-cols-6 w-full">
            <h1 className="text-center col-start-1 col-span-full text-white font-bold text-3xl mt-12">
                Gönderi Oluştur
            </h1>
            <input
                ref={entryTitle}
                className="p-2 rounded-md col-start-2 col-span-4 h-1/2 self-center row-start-2"
                placeholder={"Başlık"}
            />
            <textarea
                ref={entryDesc}
                className="p-2 rounded-md resize-none  col-start-2 col-span-4 row-start-3 row-span-2"
                placeholder={"Açıklama"}
            />
            <Button
                className="col-start-3 col-span-2 row-start-5 hover:text-white bg-white text-black"
                onClick={handleNewEntry}
            >
                <p>Entry Yolla!</p>
            </Button>
            <p className={"col-start-3 row-start-6 col-span-2 font-bold flex items-center justify-center text-red-400"}>Lütfen
                Başlık ve Açıklama Girin!</p>

        </div>
    );
};
export default CreatePost;
