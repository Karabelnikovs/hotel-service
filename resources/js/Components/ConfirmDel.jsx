import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Head, router, usePage, useForm } from "@inertiajs/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";

const ConfirmDel = ({ setShowDel, room_id, onDelete }) => {
    const handleDelete = (room_id) => {
        router.post(
            `/rooms/${room_id}`,
            {
                _method: "DELETE",
            },
            {
                onSuccess: () => {
                    setShowDel(false);
                    onDelete(room_id);
                },
            }
        );
    };
    return (
        <>
            <section className="z-1 w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen text-white">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowDel(false)}
                ></div>
                <div className="z-10 shadow-3xl bg-gray-100 border-gray-400 mx-auto rounded-2xl flex flex-col justify-center items-center gap-2 p-5 scale-125 w-80">
                    <div
                        className="absolute top-2 right-2 text-black hover:scale-125 transition ease duration-300 hover:cursor-pointer"
                        onClick={() => setShowDel(false)}
                    >
                        <IoIosClose size={20} />
                    </div>
                    <div onClick={() => handleDelete(room_id)}>
                        <PrimaryButton>Delete</PrimaryButton>
                    </div>
                    <button
                        onClick={() => setShowDel(false)}
                        className="inline-flex items-center justify-center px-5 py-3 bg-rose-800 border border-transparent rounded-2xl font-semibold text-xs text-white uppercase tracking-widest hover:bg-rose-700 focus:bg-rose-700 active:bg-rose-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 hover:scale-110 transition ease duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </>
    );
};

export default ConfirmDel;
