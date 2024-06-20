import { Link, Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import RoomCard from "@/Components/RoomCard";
import NavLink from "@/Components/NavLink";
import Pagination from "@/Components/Pagination";

export default function Welcome({
    auth,
    rooms: initialRooms,
    comments,
    users,
}) {
    const [roomss, setRooms] = useState(initialRooms.data);
    const [user, setUser] = useState(auth ? auth : "Not logged in");

    useEffect(() => {
        setUser(auth ? auth : "Not logged in");
    }, [auth]);

    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col items-center justify-center gap-10 bg-gradient-to-b from-yellow-700/50 to-gray-200">
                {auth.user ? (
                    <div className="absolute top-4 right-6 flex gap-4">
                        <NavLink className="text-xl" href={route("rooms.all")}>
                            Explore Rooms
                        </NavLink>
                    </div>
                ) : (
                    <div className="absolute top-4 right-6 flex gap-4">
                        <NavLink className="text-xl" href={route("login")}>
                            Log in
                        </NavLink>
                        <NavLink className="text-xl" href={route("register")}>
                            Register
                        </NavLink>
                    </div>
                )}
                <div className="p-12">
                    <div className="mt-10 flex items-center justify-center flex-col">
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-900 bg-clip-text text-transparent">
                            Welcome to our hotel!
                        </h1>
                        {initialRooms.data.length > 0 ? (
                            <div>
                                <div className="p-14 grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10 my-6">
                                    {roomss.map((room) => (
                                        <div className="w-full" key={room.id}>
                                            <RoomCard
                                                room={room}
                                                comments={comments}
                                                users={users}
                                                auth={user}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-lg text-gray-600 w-full flex justify-center mt-24 h-screen mb-12">
                                No rooms available
                            </div>
                        )}
                    </div>
                    <Pagination reservations={initialRooms} className="mb-10" />
                </div>
            </div>
        </>
    );
}
