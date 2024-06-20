import React from "react";
import { IoIosClose } from "react-icons/io";

const FullImage = ({ setShowImage, image }) => {
    return (
        <>
            <section className="z-1 w-full fixed left-0 top-0 flex flex-col justify-center items-center h-screen text-white">
                <div
                    className="w-full fixed bg-black/50 left-0 top-0 h-screen"
                    onClick={() => setShowImage(false)}
                ></div>
                <div className="z-0 h-screen p-6">
                    <div
                        className="absolute top-2 right-6 text-white hover:scale-125 transition ease duration-300 hover:cursor-pointer"
                        onClick={() => setShowImage(false)}
                    >
                        <IoIosClose size={35} />
                    </div>
                    <img
                        src={`/storage/images/${image}`}
                        className="rounded-3xl shadow-3xl h-full"
                    />
                </div>
            </section>
        </>
    );
};

export default FullImage;
