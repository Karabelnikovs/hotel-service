import React, { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import FullImage from "@/Components/FullImage";
import { MdOutlineComment } from "react-icons/md";
import Comments from "@/Components/Comments";
import { RiDeleteBin5Line } from "react-icons/ri";
import ConfirmDel from "@/Components/ConfirmDel";

const RoomCard = ({
    room,
    handleShowRoom,
    comments,
    users,
    auth,
    onDelete,
}) => {
    const [rooom, setRoom] = useState(room);
    const [showImage, setShowImage] = useState(false);
    const [showComs, setShowComms] = useState(false);
    const comment = comments.filter((comment) => comment.room_id === room.id);
    const [showDel, setShowDel] = useState(false);

    const handleShowImage = () => {
        setShowImage(true);
    };

    const handleShowDel = () => {
        setShowDel(true);
    };

    const handleShowComs = () => {
        setShowComms(true);
    };

    return (
        <>
            <section className="shadow-2xl bg-gray-100 border-gray-400 rounded-3xl flex flex-col justify-center items-center gap-2 px-6 pb-6 pt-3 transition ease duration-700">
                {auth.user && auth.user.type === "admin" && (
                    <div
                        className="flex justify-end w-full"
                        onClick={() => handleShowDel()}
                    >
                        <div className=" text-black hover:scale-125 transition ease duration-300 hover:cursor-pointer">
                            <RiDeleteBin5Line />
                        </div>
                    </div>
                )}

                <div onClick={() => handleShowImage()}>
                    <img
                        src={`/storage/images/${rooom.image}`}
                        alt={rooom.name}
                        className="rounded-2xl hover:scale-105 transition ease duration-300"
                    />
                </div>
                <div className="w-full flex flex-row">
                    <div className="flex flex-col justify-center items-start">
                        <h1 className="text-2xl font-bold mt-2">
                            {rooom.name}
                        </h1>
                        <p>{rooom.description}</p>
                        <p className="text-lg">{rooom.price} $</p>
                    </div>
                    <div className=" w-full flex justify-end items-center">
                        <div className="flex flex-col items-center justify-center gap-2 mt-4">
                            {auth.user && (
                                <div
                                    onClick={() => handleShowRoom(rooom)}
                                    className=""
                                >
                                    <PrimaryButton className="h-10">
                                        Reserve
                                    </PrimaryButton>
                                </div>
                            )}

                            <div
                                onClick={() => handleShowComs(rooom)}
                                className="hover:scale-110 transition ease duration-150 hover:shadow-xl hover:bg-gray-300 rounded-full p-2"
                            >
                                <MdOutlineComment size={22} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {showImage && (
                <FullImage setShowImage={setShowImage} image={rooom.image} />
            )}
            {showComs && (
                <Comments
                    setShowComms={setShowComms}
                    comments={comment}
                    room_id={rooom.id}
                    users={users}
                />
            )}
            {showDel && (
                <ConfirmDel
                    setShowDel={setShowDel}
                    room_id={rooom.id}
                    onDelete={onDelete}
                />
            )}
        </>
    );
};

export default RoomCard;
