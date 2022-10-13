import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {IComment, IPost} from "../types/interfaces";
import {ethers} from "ethers";
import {commentOnPost, getComment, getComments, getPost} from "../functions";
import Button from "../components/Button";

const Topic = () => {
    useEffect(() => {
    });

    const router = useRouter();
    const {pid} = router.query;
    const [title, setTitle] = useState("");
    const [comments, setComments] = useState<IComment[]>();
    const [post, setPost] = useState<IPost>();
    const [renderer, setRenderer] = useState(0);
    // Using the useRef hook to prevent re-renders when typing comment.
    const comment = useRef<HTMLTextAreaElement>(null);
    const postID = useRef(0);
    const postTitle = useRef("");

    function parseId() {
        if (pid && !Array.isArray(pid)) {
            postTitle.current = pid.split(/_/g)[0] as string;
            setTitle(pid.split(/_/g)[0] as string);
            postID.current = Number(pid.split(/_/g)[1] as string);
        } else if (pid && Array.isArray(pid)) {
            postTitle.current = pid[0].split(/_/g)[0] as string;
            postID.current = Number(pid[0].split(/_/g)[1] as string);
        }
    }

    useEffect(() => {
        console.log("pid fired up");
        parseId();
        getPost(postID.current).then((val) => {
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
            getCommentIdsAndComments()
        }).catch(console.log);

    }, [pid, renderer]);


    const postDate = new Date(post?.creationTime * 1000);
    const year = postDate.getFullYear();
    const month = postDate.getMonth() - 1;
    const day = postDate.getDate();


    const getCommentIdsAndComments = async () => {
        try {
            const comments = await getComments(postID.current);
            const commentArray: IComment[] = [];
            console.log(comments);
            if (comments[0]) {
                for (let i = 0; i < comments.length; i++) {
                    const convertedIds = Number(ethers.utils.formatUnits(comments[i], 0));
                    const comment = await getComment(convertedIds);
                    if (comment) {
                        commentArray.push(comment);
                    }
                }
            }
            if (commentArray[0]) {
                setComments(commentArray);
            } else {
                setComments(undefined);
            }

        } catch (error) {
            if (error instanceof Error) {
                console.log("Error when trying to get comment ids: ", error.message);
            }

        }
    };

    function checkIfCommentEligible() {
        if (comment.current && comment.current.value.length > 0 && comment.current.value.length < 50) {
            console.log("Comment is eligible.")
            return true;
        } else return false;
    }

    const mapComments = () => {
        if (comments) {
            return comments.map((comm, id) => {
                return (
                    <div key={id} className="flex mb-12  flex-col gap-4 mx-36 ">
                        <div className="p-8 bg-second    flex flex-col items-end">
                            <p>{comm.comment}</p>
                            <p>{comm.author}</p>
                        </div>
                    </div>
                )
            })
        } else {
            return <p className={"text-center text-xl  italic"}>Henüz bir yorum yapılmamış!</p>
        }

    }
    const postComment = () => {

        if (comment.current && checkIfCommentEligible()) {
            commentOnPost(postID.current, comment.current.value).then(() => {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                provider.on("block", (trans) => {
                    setRenderer(trans);
                    window.scrollTo(0, document.body.scrollHeight);

                })
            }).catch(console.log);
        }
    }

    return (
        <div className="w-full  relative   text-white ">
            <div className="self-center py-6 w-full bg-second  mb-12 flex flex-col gap-6">
                <h1 className="text-center  font-bold text-3xl pt-5 text-primary ">
                    {title}
                </h1>
                <p className="text-center bg-second">{post?.description}</p>
                <p className="text-center text-gray-400">
                    <strong>{post?.author}</strong>{" "}
                    <i>tarafından {`${day}.${month}.${year}`}</i> tarihinde oluşturuldu.
                </p>
            </div>
            {mapComments()}


            <div className={"mt-36 w-full"}>
                <div className={"flex w-full right-36 justify-center   fixed bottom-0"}>
                <textarea
                    name=""
                    id=""
                    cols={10}
                    rows={2}
                    ref={comment}
                    className="bg-second resize-none h-24 p-4 after:absolute relative self-end w-[55vw]  "
                    placeholder="Fikrinizi Paylaşın..."
                ></textarea>
                    <Button onClick={() => {
                        postComment();
                    }} className={"self-center h-24 rounded-l-none bg-third"}>
                        <p>Yorum Yap</p>
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Topic;
