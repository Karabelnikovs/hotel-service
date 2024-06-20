import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const Comments = ({ setShowComms, comments, room_id, users }) => {
    const { flash, errors } = usePage().props;

    console.log(comments);
    const { auth } = usePage().props;
    const { data, setData, post, reset } = useForm({
        comment: "",
        room_id: room_id,
    });
    const saveComm = (e) => {
        e.preventDefault();
        post("/comments", {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <section className="z-1 w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen text-white">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowComms(false)}
                ></div>
                <div className="z-10 shadow-3xl bg-gray-100 border-gray-400 mx-auto rounded-2xl flex flex-col justify-center items-center gap-2 p-5 scale-125 w-80">
                    <div
                        className="absolute top-2 right-2 text-black hover:scale-125 transition ease duration-300 hover:cursor-pointer"
                        onClick={() => setShowComms(false)}
                    >
                        <IoIosClose size={20} />
                    </div>
                    <h1 className="text-black font-extrabold text-lg">
                        Reviews
                    </h1>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div className="w-full text-black" key={comment.id}>
                                <p className="text-sm text-gray-600 flex flex-row gap-2 items-center">
                                    <FaRegCircleUser />
                                    {comment.comment}
                                    <p className="text-sm text-gray-400 mx-2">
                                        by
                                    </p>
                                    {users[comment.user_id - 1].name}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-sm text-gray-400 w-full flex justify-center mb-4">
                            No reviews yet
                        </div>
                    )}

                    {auth.user ? (
                        <form
                            className="flex flex-col gap-4 w-full mt-4"
                            onSubmit={saveComm}
                        >
                            <input
                                type="text"
                                className="shadow-lg border-2 border-gray-400 rounded-2xl w-full focus:scale-110 transition ease duration-300 text-black w-full text-sm"
                                placeholder="Write your review..."
                                onChange={(e) =>
                                    setData("comment", e.target.value)
                                }
                            />
                            {errors.comment && (
                                <p className="text-red-700 text-xs">
                                    {errors.comment}
                                </p>
                            )}
                            <PrimaryButton>Submit</PrimaryButton>
                        </form>
                    ) : (
                        <p className="text-gray-400 text-xs mt-2">
                            You must be logged in to review.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Comments;
